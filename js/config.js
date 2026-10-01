// Todos os "números mágicos" do modelo num só lugar.
// ÚNICA fonte das dimensões do disco (1 = 100 mm): Ø250 × 5 mm. Toda a geometria 3D é derivada daqui.
const DISC = { R:1.25, T:0.05 }, VIEW_R = 3.2;   // VIEW_R: raio do disco na cena (polos, núcleo, bobinas e mapa de calor foram desenhados p/ esse raio)
const S = VIEW_R/DISC.R;                          // unidades de cena por unidade do disco
// REF (Ø640×50) × SC só sobrevive nos limiares de HUD (osciloscópio e estado FRENANDO). Inércia, atrito, convecção, condução e bobina vêm da GEOMETRIA (bloco após BRAKE_K).
const REF = { R:3.2, T:0.5 };
const SC  = (DISC.R*DISC.R*DISC.T)/(REF.R*REF.R*REF.T);   // = 1/65,536
const CU  = { sigma:5.96e7, rho:8960, c:385, k:400 };            // σ (S/m), ρ (kg/m³), c (J/kg·K)
const DISC_HEATCAP = CU.rho*CU.c*Math.PI*(DISC.R*0.1)**2*(DISC.T*0.1);   // m·c do disco (raio e espessura em m): ≈ 847 J/K

// ---- Eletroímã com núcleo de ferro (culatra em C) e freio de Foucault, derivados da GEOMETRIA do desenho ----
// .md §3.2–3.3. Espelha main.js: 2 bobinas coaxiais (uma de cada lado do disco, série aditiva), eixo em x = 2,2 un., enrolamento de 3 × 6 anéis
const MU0 = 4e-7*Math.PI, U = DISC.R*0.1/VIEW_R, D = DISC.T*0.1;   // U: m por unidade de cena; D: espessura do disco (m)
const TURNS0 = 240, RATED_A = 12, POLE_X = 2.2;
const GAP_M  = 0.6*D;                                  // folga face da bobina → disco, por lado (m) = 3 mm
const COIL_A = 0.605*U, COIL_H = 0.575*U, COIL_B = 0.17*U;   // raio médio, altura axial e espessura radial do enrolamento (m)
const POLE_A = 0.69*U, POLE_R = POLE_X*U;              // POLE_A: raio externo da bobina = pegada do campo no disco (m); POLE_R: distância eixo da bobina → eixo do disco (m)
// ---- Parâmetros do Circuito Magnético em Ferro (Pesquisa §3.2c) ----
const L_FE = 0.3;                                      // Comprimento médio estimado do caminho de fluxo no ferro (m)
const MU_R = 1000;                                     // Permeabilidade relativa típica do aço (zona linear)

// .md §3.2(c): B_z = μ0·N·I/(2g + d + l_fe/μr), linear (dispersão, espraiamento e saturação desprezados)
// B_z = (μ0 * N_total * I) / (2g + d + l_fe / μr)
// O N_total é a soma das 2 bobinas (2 * TURNS0). Para obter o B_pico por 1 A ef., I_pico = √2
const B_PER_A = (MU0 * (2 * TURNS0) * Math.SQRT2) / (2 * GAP_M + D + L_FE / MU_R);
// Freio de disco fino — pesquisa §3.2(b) (Schieber, baixa velocidade) e §3.3 (Wouterse): T(ω) = 2·Tmax·s/(1+s²), s = ω/ωc
//  inclinação em baixa velocidade: c0 = ½·σ·d·B²·(π·a²)·r²·K_G, K_G = 1 − (a/R)²/(1 − (r/R)²)² (disco finito, §3.2b)
//  velocidade crítica: ωc = vc/r, vc = 2/(μ0·σ·d) (Rm = 1, cg = 1, §3.3); Tmax = c0·ωc/2 — independe de σ, ωc ∝ 1/σ
const B_EQ  = B_PER_A*RATED_A/Math.SQRT2;              // B eficaz equivalente em CC, nominal
const TH    = 1;                                       // c_g = 1 (§3.3): reação das correntes = espaço livre
const K_G   = 1 - (POLE_A/(DISC.R*0.1))**2/(1 - (POLE_R/(DISC.R*0.1))**2)**2;   // ≈ 0.83
const SLIP0 = 2*TH/(MU0*CU.sigma*D)/POLE_R;            // ωc (rad/s) do Cu ≈ 62 rad/s ≈ 593 rpm
const BRAKE_K = 0.5*B_EQ**2*Math.PI*POLE_A**2*POLE_R*TH*K_G/MU0;   // Tmax (N·m) com Ir = 1 (excitação nominal) ≈ 26 N·m
const MOTOR_T = 3*BRAKE_K;                             // motor de bancada idealizado: torque limite = 3 × Tmax nominal (premissa; ajuste ao motor real)
const L_PAIR = MU0*(2*TURNS0)**2*Math.PI*POLE_A**2/(2*GAP_M + D + L_FE/MU_R);   // §2.4: L = μ0·N²·A/g, com o mesmo circuito do §3.2(c) (N = 2 bobinas em série)
// ---- Grandezas derivadas da GEOMETRIA (disco Ø250×5): inércia, trilha, bobina, transformador ----
const R_M = DISC.R*0.1, M_DISC = CU.rho*Math.PI*R_M*R_M*D, A_DISC = 2*Math.PI*R_M*(R_M + D);   // raio (m), massa (kg), área de troca: 2 faces + borda (m²)
const J_DISC = 0.5*M_DISC*R_M*R_M + 7e-4;                 // kg·m²: disco (½mR²) + cubo e eixo de aço do desenho
const TRACK_FRAC = 4*POLE_R*POLE_A/(R_M*R_M);             // fração da massa no anel varrido sob os polos (r ± a) ≈ 0,53
const G_TRACK = CU.k*D*2*Math.PI*POLE_R/POLE_A;            // condução radial anel → resto do disco (k_Cu = 400 W/m·K, §4.1) ≈ 44 W/K
const WIRE_A0 = RATED_A/5e6;                               // seção do fio p/ 5 A/mm² no nominal (m²); janela fixa → R ∝ N², J ∝ N·I
const LT = 2*Math.PI*0.605*U;                              // comprimento médio da espira (m)
const COIL = { R20:1.72e-8*2*TURNS0*LT/WIRE_A0, alpha:0.00393, C:1.1*385*CU.rho*2*TURNS0*LT*WIRE_A0, G:1.5,
  L0:L_PAIR };   // par em série: R20 ≈ 0,51 Ω, L ≈ 58 mH (§2.4), isolação classe F
export const CONFIG = {
  disc:{ ...DISC, Rv:VIEW_R, Tv:DISC.T*S, gap:0.6*DISC.T*S, mm:DISC.R*100/VIEW_R },   // Rv/Tv: raio/espessura na cena; gap: folga bobina–disco por lado (0,6·T = 3 mm p/ 5 mm); mm: mm por unidade de cena
  poleX:POLE_X,                       // raio do eixo dos polos (mundo, +x)
  overlayOffset:0.004,             // afastamento entre planos E / B (anti z-fighting)
  cables:[
    [[2.7,-0.68,1.1],[3.0,-1.6,1.9],[2.9,-3.6,2.9],[2.6,-4.5,3.3]],
    [[2.7,-0.68,-1.1],[3.2,-1.6,-1.9],[3.4,-3.4,-1.5],[3.5,-4.4,1.2],[4.2,-4.5,3.3]]
  ],
  feedBoxX:[2.6,4.2],
  phys:{ bPerA:B_PER_A, bMax:1.50, trackFrac:TRACK_FRAC, turns0:TURNS0, ratedA:RATED_A, slip0:SLIP0, heatFrac:1.0, ambient:28,
         // bPerA: B de pico (T) por A ef. com turns0 espiras (ver bloco acima); por ampere instantâneo vale bPerA/√2. bMax: fim da escala do mapa de B (T); só escala visual, o modelo é linear (§3.2c)
         // brakeK/slip0: físicos (acima, bloco do freio). Abaixo: inércia, atrito (rolamentos + windage Cm·ρ·R⁵·ω²), convecção h = h0 + h1·ω (+ radiação), condução na trilha, transformador (trP, trS) e bobina (R, L, C, G) vêm da geometria; o motor idealizado vale 3 × Tmax nominal (MOTOR_T)
         gTrack:G_TRACK, motorGain:0.075*MOTOR_T, motorMin:-0.225*MOTOR_T, motorMax:MOTOR_T, brakeK:BRAKE_K,
         lossA:0.003, lossB:5e-5, lossC:0.006*1.2*R_M**5, inertia:J_DISC, area:A_DISC, h0:6, h1:0.11, eps:0.4,
         trP:Math.PI*D*POLE_A**4/8, trS:MU0*D*POLE_A/(2*TH), coil:COIL, thermalMass:DISC_HEATCAP,
         scale:SC },   // scale: fator SC exposto p/ limiares de torque/potência no HUD e no osciloscópio
  sim:{ dt:1/120, maxSteps:12, maxFrame:0.1 },   // passo fixo + acumulador
  hudEvery:0.12,
  heat:{ tau:3.0, lift:0.007, trackDT:100, tMax:400 },   // trackDT: sobreelevação didática da trilha; tMax: fim da escala do mapa (°C)
  materials:{   // σ (S/m), ρ (kg/m³), c (J/kg·K); Cu é a referência do modelo
    Cu:{ name:'Cobre',    ...CU, alpha:0.00393, color:0xc97a3f, metal:1.0,  rough:0.30 },
    Al:{ name:'Alumínio', sigma:3.5e7, alpha:0.0040,  rho:2700, c:900, k:237, color:0xbcc3ca, metal:1.0,  rough:0.35 },
    Fe:{ name:'Aço',      sigma:6.0e6, alpha:0.0065,  rho:7850, c:490, k:50, color:0x6f757c, metal:0.85, rough:0.50 }
  },
  shadow:{ high:2048, low:512 },
  bloom:{ strength:0.55, radius:0.6, threshold:1.0, fieldGain:1.7, discGain:2.4 }
};
