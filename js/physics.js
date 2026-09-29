import { CONFIG } from './config.js';
const P = CONFIG.phys, M = CONFIG.materials, REF = M.Cu;
export const view   = { field:true, efield:true, swirl:true, labels:true };
export const params = { rpm:900, exc:0.55, freq:1.2, hold:false, motor:true, mode:'ac', dir:1, mat:'Cu', turns:P.turns0 };
const init = () => ({ t:0, theta:0, omega:0, phi:0, temp:P.ambient, tTrack:P.ambient, trip:false, I:0, Irms:0, Ir:0, Tb:0, P:0, eN:0, uEff:0 });
export const sim    = init();
export function resetSim(omega0 = 0){ Object.assign(sim, init(), { omega:omega0 }); }
export const turnsRatio = () => params.turns/P.turns0;   // B ∝ N·I
// Bobinas sem núcleo ferromagnético: não há saturação, B ∝ N·I (linear)
// σ menor → velocidade crítica maior (slip0 ∝ 1/σ); ρ·c define a massa térmica (mesmo volume de disco)
export function matProps(key = params.mat){
  const m = M[key] || REF;
  return { ...m, slip0:P.slip0*REF.sigma/m.sigma, thermalMass:P.thermalMass*(m.rho*m.c)/(REF.rho*REF.c) };
}

export function step(dt){
  const mp = matProps(), d = params.dir;
  sim.uEff = sim.trip ? 0 : (params.hold ? Math.max(1, params.exc) : params.exc);
  sim.t += dt;
  sim.theta = (sim.theta + 2*Math.PI*params.freq*dt) % (2*Math.PI);   // fase acumulada: sem salto ao mudar f
  const Ipk = P.ratedA*sim.uEff;
  sim.I    = sim.uEff > 0 ? (params.mode === 'dc' ? Ipk : Ipk*Math.SQRT2*Math.sin(sim.theta)) : 0;   // CC: I = valor ef. → torque constante = Tb
  sim.Irms = Ipk;
  const excLinear = sim.uEff * turnsRatio();
  // Bobinas de ar não saturam, comportamento estritamente linear:
  const Ir = excLinear; 
  sim.Ir = Ir;
  
  const w = sim.omega, wT = Math.max(0.1, params.rpm*Math.PI/30);
  
  // Curva realista de binário de motor de indução (Fórmula de Kloss)
  const sk = 0.20; // Escorregamento crítico típico (aprox. 20%)
  const s_motor = (wT - d*w) / wT; // Escorregamento do motor
  let Tm = 0; // Torque mecânico do motor
  
  if (params.motor) {
    if (s_motor !== 0) {
      Tm = d * (2 * P.motorMax) / ((s_motor / sk) + (sk / s_motor));
    }
    // Proteção para não exceder limites extremos na simulação
    Tm = Math.max(d * P.motorMin, Math.min(d * P.motorMax, Tm));
  }
  
  const s = w/mp.slip0;
  const cb = P.brakeK*Ir*Ir*2/(mp.slip0*(1 + s*s));   // Amortecimento efetivo de Foucault (Lei de Lenz)
  
  // Euler explícito para a força motriz (Tm) e implícito para o freio (cb) para estabilidade
  const w1 = (w + dt*Tm/P.inertia)/(1 + dt*cb/P.inertia);
  sim.Tb = cb*w1;
  const aw = Math.abs(w), fr = (P.lossA + P.lossB*aw + P.lossC*aw*aw)/P.inertia*dt;   // atrito nunca inverte o sentido
  sim.omega = Math.sign(w1)*Math.max(0, Math.abs(w1) - fr);
  sim.phi += sim.omega*dt;
  sim.P = sim.Tb * w1;
  // dois nós térmicos: trilha sob os polos (pouca massa, recebe o calor) → disco (massa maior, perde para o ambiente)
  const Ct = mp.thermalMass*P.trackFrac, Cd = mp.thermalMass - Ct, flow = P.gTrack*(sim.tTrack - sim.temp);
  
  // Convecção forçada: o disco em rotação atua como ventilador, aumentando a dissipação térmica
  const conveccaoForcada = P.cool * (1 + 0.15 * Math.abs(sim.omega));
  
  sim.tTrack += (sim.P*P.heatFrac - flow)/Ct*dt;
  sim.temp   += (flow - conveccaoForcada*(sim.temp - P.ambient))/Cd*dt;
  if (!sim.trip && sim.tTrack > P.tripOn)  sim.trip = true;     // a proteção atua na trilha (ponto mais quente)
  if (sim.trip  && sim.tTrack < P.tripOff) sim.trip = false;
}
