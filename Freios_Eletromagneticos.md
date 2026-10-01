# Freios Eletromagnéticos: Fundamentos Físicos, Modelagem, Projeto e Aplicações

*Documento técnico de nível de pós-graduação — Conversão Eletromecânica de Energia*

> **Nota de rastreabilidade (leia antes de citar este texto)**
>
> - Toda afirmação técnica traz uma citação numérica `[n]` que remete à seção 7.
> - `[†]` marca uma afirmação de engenharia consolidada na prática, para a qual **não** localizei fonte acadêmica verificável nesta seleção. Complemente-a antes de submeter o texto.
> - Na seção 7, "DOI a confirmar" indica que o DOI não foi conferido. Os demais DOIs e links apareceram em resultados de busca (página do periódico ou lista de referências de outro artigo). Valide-os em doi.org antes de submeter.
> - As expressões de Schieber [9] e de Wouterse [10] foram reproduzidas a partir de literatura secundária ([10], [16], [43]). Confira-as nos artigos originais antes de publicar.
> - Os exemplos numéricos são ilustrativos: cálculo próprio a partir das equações do texto, com valores típicos de propriedades a 20 °C.
> - As referências [36]–[42] (calor, projeto mecânico e normas) fogem da lista de fontes acadêmicas estritas. Foram incluídas porque as seções 2.4, 3.4 e 5 não podem prescindir delas.
> - Notação: $\vec{J}$ é densidade de corrente; $J_m$, momento de inércia; $\rho_m$, massa específica; $p$, pares de polos; $\omega$, velocidade angular mecânica; $\omega_e = p\,\omega$, velocidade angular elétrica.

---

## 1. Fundamentos Físicos e Eletromagnéticos

### 1.1 Indução eletromagnética: lei de Faraday–Neumann–Lenz

A lei de Faraday–Neumann–Lenz afirma que a força eletromotriz induzida num contorno fechado é igual, em módulo, à taxa de variação do fluxo magnético que o atravessa. O sinal negativo expressa a lei de Lenz: a corrente induzida cria um campo que se opõe à variação de fluxo que a originou [1][2][3].

$$
\mathcal{E}=\oint_C \vec{E}'\cdot d\vec{l}=-\frac{d\Phi_B}{dt},\qquad
\Phi_B=\int_S \vec{B}\cdot d\vec{S}
$$

- $\mathcal{E}$: força eletromotriz induzida [V].
- $\vec{E}'$: campo elétrico no referencial do condutor [V/m].
- $C$: contorno fechado que delimita a superfície $S$; $d\vec{l}$: elemento de contorno [m].
- $\Phi_B$: fluxo magnético [Wb = T·m²]; $\vec{B}$: densidade de fluxo [T]; $d\vec{S}$: elemento de área orientado [m²].

Na forma diferencial, $\nabla\times\vec{E}=-\partial\vec{B}/\partial t$ [V/m²] [1][3]. Para um condutor com velocidade $\vec{v}$ em relação ao referencial do laboratório (regime não relativístico, $v\ll c$), o campo visto pelo condutor é [3][4]:

$$
\vec{E}'=\vec{E}+\vec{v}\times\vec{B},\qquad \vec{J}=\sigma\,\vec{E}'=\sigma\left(\vec{E}+\vec{v}\times\vec{B}\right)
$$

- $\vec{E}$: campo elétrico no referencial do laboratório [V/m].
- $\vec{v}$: velocidade local do material condutor [m/s].
- $\sigma$: condutividade elétrica [S/m].
- $\vec{J}$: densidade de corrente [A/m²].

O freio eletromagnético explora o **movimento relativo** entre condutor e campo. Se o campo é estático no laboratório e o disco gira, o termo $\vec{v}\times\vec{B}$ é a única fonte de fem (indução por movimento). No referencial do disco, o mesmo fenômeno aparece como campo variável no tempo. As duas descrições são equivalentes [3][4].

### 1.2 Geração de correntes parasitas (Foucault / *eddy currents*)

**Condutor contínuo.** Em regime quase estático, a corrente é solenoidal e não atravessa as superfícies do condutor [3][7]:

$$
\nabla\cdot\vec{J}=0,\qquad \vec{J}\cdot\hat{n}\big|_{\text{superfície}}=0,\qquad \vec{E}=-\nabla\varphi
$$

Substituindo em $\vec{J}=\sigma(-\nabla\varphi+\vec{v}\times\vec{B})$, resulta uma equação de Poisson para o potencial escalar:

$$
\nabla^{2}\varphi=\nabla\cdot(\vec{v}\times\vec{B})=\vec{B}\cdot(\nabla\times\vec{v})-\vec{v}\cdot(\nabla\times\vec{B})
\;\;\overset{\text{rotação rígida},\ \nabla\times\vec{B}\approx 0}{\Longrightarrow}\;\;
\nabla^{2}\varphi\simeq 2\,\vec{\omega}\cdot\vec{B}
$$

- $\varphi$: potencial elétrico devido ao acúmulo de cargas na superfície do condutor [V].
- $\vec{\omega}$: velocidade angular do disco [rad/s]. Numa rotação rígida, $\nabla\times\vec{v}=2\vec{\omega}$.
- A aproximação $\nabla\times\vec{B}\approx 0$ equivale a desprezar o campo criado pelas próprias correntes (baixa velocidade).

O potencial $\varphi$ cria uma "corrente de retorno" que fecha as linhas de corrente dentro do condutor. Sem ele, o modelo seria o de um disco homopolar (Faraday), com corrente radial $J_r=\sigma\omega r B_z$ e sem caminho de retorno. Esse é o ponto de partida da indução unipolar tratada em [8]. Em geometrias reais, o retorno da corrente atravessa parte da região magnetizada e reduz o torque líquido, como se verá em 3.2 [9][43].

**Difusão do campo e profundidade de penetração.** Combinando Faraday e Ampère (sem corrente de deslocamento) num condutor em repouso, obtém-se [3][4]:

$$
\nabla^{2}\vec{B}=\mu\sigma\,\frac{\partial\vec{B}}{\partial t},\qquad
\delta_s=\sqrt{\frac{2}{\omega_e\,\mu\,\sigma}}=\frac{1}{\sqrt{\pi f\,\mu\,\sigma}}
$$

- $\mu=\mu_0\mu_r$: permeabilidade do material [H/m]; $\mu_0=4\pi\times10^{-7}$ H/m; $\mu_r$: permeabilidade relativa [adimensional].
- $f$: frequência do campo *vista pelo material* [Hz]; $\omega_e=2\pi f$ [rad/s].
- $\delta_s$: profundidade de penetração (efeito pelicular) [m].

*Exemplo (a 50 Hz, $\mu_r=1$):* cobre ($\sigma\approx5{,}96\times10^{7}$ S/m) dá $\delta_s\approx 9{,}2$ mm; alumínio ($\sigma\approx3{,}5\times10^{7}$ S/m) dá $\delta_s\approx 12$ mm [1][2]. Quando a espessura $d$ do rotor é da ordem de $\delta_s$ ou maior, a hipótese de campo uniforme na espessura deixa de valer.

**Condutores ferromagnéticos.** Com $\mu_r\gg1$, $\delta_s$ diminui por um fator $\sqrt{\mu_r}$. As correntes se concentram numa camada superficial fina, e surgem perdas por histerese e perdas "em excesso" além das de Foucault [29]. O rotor passa a fazer parte do circuito magnético, e a saturação faz $\mu_r$ cair com o aumento de $B$ [5][6]. Rotores de aço maciço, com ou sem camada de cobre, são estudados nos retardadores e nos freios de alta velocidade [16][17][18].

### 1.3 Força de Lorentz e tensor de tensões de Maxwell

**Visão volumétrica (Lorentz).** A força por unidade de volume sobre o condutor percorrido por $\vec{J}$ em presença de $\vec{B}$, e o torque resultante, são [3][4]:

$$
\vec{f}=\vec{J}\times\vec{B},\qquad
\vec{T}_b=\int_V \vec{r}\times\left(\vec{J}\times\vec{B}\right)dV
$$

- $\vec{f}$: densidade volumétrica de força [N/m³]; $\vec{r}$: vetor posição em relação ao eixo [m]; $V$: volume do condutor [m³]; $\vec{T}_b$: torque frenante [N·m].

Se $\vec{J}\approx\sigma\,\vec{v}\times\vec{B}$ e $\vec{v}\perp\vec{B}$, então $\vec{f}=\sigma(\vec{v}\times\vec{B})\times\vec{B}=-\sigma B^{2}\vec{v}$. A força é **antiparalela à velocidade** e proporcional a ela (lei de Lenz em ação). A potência mecânica absorvida, $\vec{f}\cdot\vec{v}=-\sigma B^{2}v^{2}=-J^{2}/\sigma$, é exatamente a potência dissipada por efeito Joule [3].

**Visão de superfície (Maxwell).** No limite $v\ll c$, os termos elétricos do tensor são desprezíveis, e o tensor de tensões magnético é [3][4]:

$$
T_{ij}=\frac{1}{\mu_0}\left(B_iB_j-\frac{1}{2}\delta_{ij}B^{2}\right),\qquad
F_i=\oint_S T_{ij}\,n_j\,dS,\qquad
\vec{T}_b=\oint_S \vec{r}\times\left(\overleftrightarrow{T}\cdot\hat{n}\right)dS
$$

- $T_{ij}$: componentes do tensor de tensões de Maxwell [N/m² = Pa]; $\delta_{ij}$: delta de Kronecker [adimensional].
- $n_j$: componente do versor normal externo a $S$; $S$: superfície fechada que envolve o rotor (nas faces do disco e no entreferro) [m²].

Nas faces de um disco (normal $\hat{z}$), a componente tangencial da tração é $t_\theta=B_\theta B_z/\mu_0$. Logo:

$$
T_b=-\oint_{S}\frac{r\,B_\theta B_z}{\mu_0}\,dS
$$

- $B_z$: componente axial (normal ao disco) [T]; $B_\theta$: componente tangencial [T]; $r$: raio [m].

**Interpretação.** O torque frenante só existe se o campo tiver componente tangencial $B_\theta\neq0$, isto é, se as linhas de campo forem *arrastadas* pelo movimento do condutor. Com o disco parado, $B_\theta=0$ e o torque é nulo. Em velocidades muito altas, o campo é parcialmente expulso do condutor, $B_z$ efetivo diminui e o torque decresce [9][10]. Essa leitura anuncia o comportamento da seção 3.3.

---

## 2. Tipos e Classificação de Freios Eletromagnéticos

### 2.1 Freios por correntes parasitas (*Eddy Current Brakes* — ECB)

**Arquitetura.**

- *Disco (fluxo axial):* um disco condutor (Cu ou Al, ou aço com camada de cobre) gira entre pares de polos eletromagnéticos ou de ímãs permanentes [13][16].
- *Tambor (fluxo radial):* rotor cilíndrico maciço ou ranhurado, com polos salientes no estator. É a topologia das "máquinas de correntes parasitas" e dos retardadores veiculares [16][17][18].
- *Linear (trilho):* eletroímãs suspensos sobre o trilho, com polos alternados norte–sul e um entreferro pequeno. O trilho faz o papel do rotor [20][22][23][44].
- *Excitação:* bobinas em corrente contínua (torque controlável), ímãs permanentes (passivo, sem alimentação) ou híbrida [24][26].

**Princípio de acoplamento.** O acoplamento é puramente eletromagnético, por correntes induzidas, e não há contato mecânico. Por isso **não há desgaste do par de frenagem** [20][27]. O acoplamento exige velocidade relativa, e o torque é nulo em $\omega=0$ (seção 3) [9][10].

**Curva torque × velocidade.** O torque cresce aproximadamente de forma linear com $\omega$ (regime resistivo), atinge um máximo $T_{max}$ na velocidade crítica $\omega_c$ e decresce aproximadamente como $1/\omega$ (regime indutivo) [10][16]. Uma forma paramétrica de "dupla exponencial" também é usada em simulação veicular [16]. A dedução do modelo está em 3.3.

**Regime de operação.** A energia cinética vira calor no próprio rotor (ou no trilho). O regime contínuo depende da capacidade de refrigeração, e o freio não segura carga parada. Por isso costuma ser combinado a um freio de fricção para a parada final [†]. Em ferrovia, a operação do freio linear em serviço e em emergência é estudada em [20][21][27].

### 2.2 Freios de histerese magnética

**Arquitetura.** Um anel de material magnético semiduro (rotor de histerese) gira num entreferro anular, entre polos excitados por bobina ou por ímãs permanentes [5][6][31]. O conjugado provém da **remagnetização cíclica** do anel, e não de correntes induzidas.

**Modelo de torque.** A energia dissipada por ciclo do laço $B$–$H$, por unidade de volume, é [28][29]:

$$
W_h=\oint H\,dB\;\approx\;k_h\,B_m^{\,n}\quad(\text{lei de Steinmetz})
$$

- $W_h$: energia de histerese por ciclo [J/m³]; $H$: intensidade de campo [A/m]; $B_m$: indução máxima [T].
- $k_h$: coeficiente do material [J·m⁻³·T⁻ⁿ]; $n$: expoente de Steinmetz, cerca de 1,6 no trabalho original e entre 1,5 e 2,5 em materiais modernos [28][29].

Com $p$ pares de polos e velocidade de escorregamento $\omega_s=\omega_{\text{eixo}}-\omega_{\text{campo}}$, a frequência de remagnetização vista pelo anel é $f_e=p\,\omega_s/2\pi$. A potência e o torque de histerese ficam [5][6][31]:

$$
P_h=f_e\,W_h\,V_h,\qquad
T_h=\frac{P_h}{\omega_s}=\frac{p\,W_h\,V_h}{2\pi}
$$

- $P_h$: potência dissipada [W]; $V_h$: volume do anel [m³]; $p$: pares de polos [adimensional]; $\omega_s$: escorregamento [rad/s].

O resultado **independe de $\omega_s$**: o torque de histerese é constante em toda a faixa de velocidades e depende só do fluxo de excitação (portanto, da corrente). Somando as perdas clássicas de Foucault no anel, $P_{cl}=k_{cl}\,f_e^{2}\,V_h$, surge um termo linear em $\omega_s$ [29]:

$$
T(\omega_s)=T_h+k_e\,\omega_s,\qquad k_e=\frac{k_{cl}\,p^{2}\,V_h}{4\pi^{2}}
$$

- $k_{cl}$: coeficiente de perdas clássicas [W·s²/m³]; $k_e$: coeficiente de torque viscoso equivalente [N·m·s/rad].

**Saturação e laço B–H.** Quando a excitação leva o anel ao laço principal, $W_h$ atinge o máximo, $T_{h,max}=p\,W_{h,max}V_h/2\pi$, e correntes maiores não aumentam o torque. O torque em função da corrente tem formato sigmoidal e satura. O laço pode ser simulado pelo modelo de Jiles–Atherton [30]. As expressões acima assumem laço ideal; a histerese rotacional real desvia dessa previsão [29][30].

**Baixa e zero rotação.** Em sincronismo ($\omega_s=0$) o anel fica magnetizado, "travado" pelo campo, e transmite torque até um limite ligado à remanência e à coercividade. Esse é o mesmo mecanismo do motor de histerese, que desenvolve conjugado em qualquer velocidade, inclusive a síncrona [5][6][31]. Como $P_h=T_h\omega_s$, a dissipação cresce com a rotação, e os freios de histerese ficam confinados a potências de escorregamento modestas (controle de tensão em fio, bancos de teste de pequeno porte) [†].

### 2.3 Freios de partícula magnética

**Arquitetura.** O entreferro entre rotor e estator é preenchido por pó ferromagnético seco, ou por fluido magnetorreológico (MR), isto é, partículas suspensas em óleo. A ideia remonta à embreagem de fluido magnético de Rabinow [32]. A bobina do estator cria o fluxo que atravessa o entreferro.

**Reologia.** Sem campo, as partículas ficam dispersas e o arrasto é baixo (viscoso). Com campo, elas se alinham em cadeias ao longo das linhas de fluxo, e o meio passa a ter tensão de escoamento $\tau_y(B)$. O modelo de Bingham é o mais usado [33][34][35]:

$$
\tau=\tau_y(B)\,\operatorname{sgn}(\dot\gamma)+\eta\,\dot\gamma,\qquad \dot\gamma=\frac{\omega r}{h}
$$

- $\tau$: tensão de cisalhamento [Pa]; $\tau_y(B)$: tensão de escoamento dependente do campo [Pa]; $\eta$: viscosidade plástica [Pa·s].
- $\dot\gamma$: taxa de cisalhamento [s⁻¹]; $h$: espessura do entreferro de trabalho [m]; $r$: raio [m].

Em baixas induções, $\tau_y$ cresce aproximadamente entre $B^{3/2}$ e $B^{2}$ (a depender do modelo de interação entre partículas) e satura quando as partículas saturam magneticamente [33][35].

Para um disco anular (raios interno $R_i$ e externo $R_o$) com $n_s$ superfícies de trabalho no modo cisalhante:

$$
T_b=n_s\int_{R_i}^{R_o}\tau\;2\pi r^{2}\,dr
=n_s\left[\frac{2\pi}{3}\,\tau_y(B)\left(R_o^{3}-R_i^{3}\right)+\frac{\pi\,\eta\,\omega}{2h}\left(R_o^{4}-R_i^{4}\right)\right]
$$

- $n_s$: número de superfícies cisalhadas [adimensional]; $R_i,R_o$: raios [m]; $\omega$: escorregamento [rad/s]; $T_b$: torque [N·m].

O primeiro termo, controlável pela corrente, domina e é praticamente independente da velocidade. O segundo é o torque viscoso residual, que também existe com a bobina desligada. A resposta é rápida (milissegundos), limitada pela constante $L/R$ da bobina e pela formação das cadeias [34]. O torque não é nulo em $\omega=0$ (retenção por $\tau_y$) [33]. A potência $P=T_b\omega$ se dissipa no fluido e no pó, o que limita a potência de escorregamento contínua. Especificidades dos freios de **pó seco** (desgaste e envelhecimento do pó, comportamento tipo atrito) [†].

### 2.4 Freios eletromecânicos acionados por mola (*spring-applied / fail-safe*)

**Arquitetura e operação.** O conjunto tem estator com bobina, placa-armadura, molas, disco de atrito (rotor) sobre o cubo e placa de reação. Com a bobina **desenergizada**, as molas empurram a armadura e prensam o disco de atrito: o freio **aplica**. Com a bobina **energizada**, a atração magnética vence as molas, abre o entreferro e o freio **libera**. A frenagem ocorre por atrito mecânico, e o eletroímã só comanda a liberação. Por isso, na falta de energia o freio aplica sozinho (falha segura) [5][38].

**Torque estático de frenagem.** Para $n_f$ superfícies de atrito com coeficiente $\mu_f$ e força axial das molas $F_s$ [38]:

$$
T_b=n_f\,\mu_f\,F_s\,r_m,\qquad
r_m=\frac{2}{3}\,\frac{R_o^{3}-R_i^{3}}{R_o^{2}-R_i^{2}}\ \ (\text{pressão uniforme}),\qquad
r_m=\frac{R_o+R_i}{2}\ \ (\text{desgaste uniforme})
$$

- $n_f$: superfícies de atrito [adimensional]; $\mu_f$: coeficiente de atrito [adimensional]; $F_s$: força total das molas [N].
- $r_m$: raio médio efetivo de atrito [m]; $R_i,R_o$: raios interno e externo do revestimento [m].

**Liberação eletromagnética.** Desprezando relutância do ferro e dispersão, a indutância e a força atrativa com um entreferro $g$ são [5][1]:

$$
L(g)=\frac{\mu_0N^{2}A}{g},\qquad
F_m=\frac{\mu_0N^{2}A\,i^{2}}{2g^{2}}
$$

- $N$: espiras da bobina [adimensional]; $A$: área efetiva do polo [m²]; $g$: entreferro [m]; $i$: corrente [A].
- $L$: indutância [H]; $F_m$: força de atração [N].

A liberação exige $F_m(g_0)\ge F_s$ com o entreferro máximo $g_0$. Como $F_m\propto g^{-2}$, uma vez atraída a armadura o entreferro residual é muito menor, e a corrente de manutenção pode ser bem menor que a de atração. É o princípio dos circuitos "economizadores" [†]. O tempo de aplicação é dominado pelo decaimento da corrente da bobina, com constante $\tau_e=L/R$. Um diodo de roda-livre sozinho retarda o decaimento e, portanto, a frenagem. Circuitos de desexcitação rápida reduzem esse atraso [†].

**Normas e segurança funcional.** Em acionamentos elétricos, o comando seguro do freio é uma função de segurança padronizada (*Safe Brake Control*) [39]. O projeto de partes de sistemas de comando relacionadas à segurança segue a ISO 13849-1 [40]. Para elevadores, os requisitos de frenagem e proteção contra sobrevelocidade constam da EN 81-20 [41].

### 2.5 Quadro-síntese

| Tipo | $T(\omega)$ | Torque em $\omega=0$ | Controle | Onde dissipa | Fontes |
|---|---|---|---|---|---|
| ECB | $\propto\omega$ até $\omega_c$; depois $\propto1/\omega$ | Nulo | Corrente de excitação (ou passivo, com ímã) | Rotor / trilho | [9][10][16] |
| Histerese | Aprox. constante (+ termo linear em altas freq.) | Sim (limitado pela remanência) | Corrente (saturável) | Anel de histerese | [29][31] |
| Partícula / MR | Aprox. constante + termo viscoso | Sim ($\tau_y$) | Corrente | Fluido / pó no entreferro | [33][34] |
| Mola-aplicado (fail-safe) | Atrito (aprox. constante) | Sim (máximo) | Liga / desliga (liberação) | Revestimento de atrito | [38][39] |

---

## 3. Modelagem Matemática e Equações Fundamentais

### 3.1 Equação fundamental de campo e densidade de corrente

Para um disco de condutividade $\sigma$ girando com $\vec{\omega}=\omega\hat{z}$ sob um campo axial $\vec{B}=B_z\hat{z}$, a velocidade local é $\vec{v}=\omega r\,\hat{\theta}$. Como $\hat{\theta}\times\hat{z}=\hat{r}$, a fem de movimento é radial [3][8]:

$$
\vec{J}=\sigma\left(-\nabla\varphi+\omega r B_z\,\hat{r}\right),\qquad
\nabla\cdot\vec{J}=0,\qquad \vec{J}\cdot\hat{n}=0\ \text{nas faces e na borda}
$$

- $\vec{J}$: densidade de corrente [A/m²]; $\sigma$: condutividade [S/m]; $\varphi$: potencial de cargas superficiais [V].
- $\omega$: velocidade angular [rad/s]; $r$: raio [m]; $B_z$: componente axial de $\vec{B}$ [T].

Em disco fino (espessura $d$), define-se a densidade superficial de corrente $\vec{K}=\vec{J}\,d$ [A/m], com $\nabla_s\cdot\vec{K}=0$. O problema bidimensional resultante foi resolvido por Smythe (disco de raio finito, método das imagens) [7], por Schieber (solução geral para o disco rotativo, válida também para a fita linear) [9] e por Wouterse (inclusão do campo das correntes induzidas) [10]. Lee e Park usam a lei de Coulomb com imagens para impor a condição de borda, com boa concordância em baixa velocidade [14].

### 3.2 Torque frenante $T_b$

**(a) Modelo elementar (sem corrente de retorno).** Desprezando $\varphi$, a corrente é $J_r=\sigma\omega r B_z$. A força por volume é $\vec{f}=\vec{J}\times\vec{B}=-J_rB_z\,\hat{\theta}$, pois $\hat{r}\times\hat{z}=-\hat{\theta}$. O torque é [3]:

$$
T_b=\int_V r\,J_rB_z\,dV=\sigma\,d\,\omega\int_{A}r^{2}B_z^{2}\,dA\;\approx\;\sigma\,d\,\omega\,B_z^{2}\,A_p\,r_m^{2}
$$

- $d$: espessura do disco [m]; $A_p$: área do polo projetada no disco [m²]; $r_m$: raio médio do polo [m]; $B_z$: indução média no polo [T].

Esta expressão é um **majorante**: o retorno real da corrente passa pela região com campo e reduz a fem líquida. Ela é o análogo do modelo de "torque proporcional a $\omega$" dos tratamentos didáticos, que a refinam sucessivamente [11][12].

**(b) Solução de Schieber (baixa velocidade).** Para polo circular de raio $r_p$ com centro à distância $m$ do eixo e disco de raio $a$, a expressão reportada é [9][43]:

$$
T_b=\frac{1}{2}\,\sigma\,d\,\omega\,\pi r_p^{2}\,m^{2}B_z^{2}\left[1-\frac{(r_p/a)^{2}}{\left(1-(m/a)^{2}\right)^{2}}\right]
$$

- $r_p$: raio do polo [m]; $m$: distância do eixo ao centro do polo [m]; $a$: raio do disco [m]; demais variáveis como antes.

No limite $a\to\infty$, $T_b=\tfrac12\sigma d\,\omega\,\pi r_p^{2}m^{2}B_z^{2}$: o fator $k_g=\tfrac12$ em relação ao majorante (a) resume o efeito da corrente de retorno. A fórmula vale só em baixa velocidade, e Schieber não tratou a região de alta velocidade [9][43].

**(c) Dependência de $\mu$ e do circuito magnético.** A indução no entreferro vem da lei de Ampère aplicada ao circuito com dois entreferros $g$, o disco de espessura $d$ (não magnético) e o caminho de ferro de comprimento $l_{fe}$ e permeabilidade relativa $\mu_r$ [1][5]:

$$
B_z\simeq\frac{\mu_0\,N I}{2g+d+l_{fe}/\mu_r}
$$

- $N I$: força magnetomotriz [A·espira]; $g$: entreferro por lado [m]; $l_{fe}$: comprimento médio do caminho no ferro [m]; $\mu_r$: permeabilidade relativa do ferro [adimensional].
- Desprezam-se dispersão, espraiamento e saturação.

Combinando (b) com (c), para $\omega\ll\omega_c$:

$$
T_b\approx k_g\,\sigma\,d\,\omega\,A_p\,r_m^{2}\left[\frac{\mu_0NI}{2g+d+l_{fe}/\mu_r}\right]^{2},\qquad k_g\approx\tfrac12
$$

Assim, $T_b$ depende de $B_z$, $\sigma$, $d$, $r_m$, $\mu$ (via $\mu_0$ e $\mu_r$) e $\omega$, como pedido.

*Exemplo ilustrativo:* cobre ($\sigma=5{,}96\times10^{7}$ S/m), $d=5$ mm, $g=2$ mm, $NI=3000$ A·e, $l_{fe}/\mu_r\approx0{,}1$ mm, $r_p=20$ mm ($A_p\approx1{,}26\times10^{-3}$ m²), $r_m=0{,}10$ m, $\omega=10$ rad/s. Resultam $B_z\approx0{,}41$ T e $T_b\approx3{,}2$ N·m pela expressão linear. Com a correção de alta velocidade da seção 3.3 ($x\approx0{,}19$), o valor cai para cerca de 3,1 N·m. O cálculo é uma estimativa de ordem de grandeza. Para projeto, use FEM 2D/3D [16][17][18].

### 3.3 Velocidade crítica $\omega_c$: regime resistivo × regime indutivo

**Argumento de escala (número de Reynolds magnético).** Se o disco fino se move a $v$ sob campo $B$, a densidade superficial de corrente é $K\sim\sigma d\,vB$. Uma corrente superficial uniforme $K$ cria um campo de módulo $\mu_0K/2$ [3]. A reação torna-se comparável ao campo aplicado quando $\mu_0K/2\sim B$:

$$
v_c\simeq\frac{2}{\mu_0\,\sigma\,d}\,c_g,\qquad
R_m=\frac{\mu_0\,\sigma\,d\,v}{2}\ \Rightarrow\ R_m\sim1\ \text{em}\ v=v_c
$$

- $v_c$: velocidade linear crítica [m/s]; $R_m$: número de Reynolds magnético do disco fino [adimensional]; $c_g\sim1$: fator geométrico [adimensional]; $\omega_c\approx v_c/r_m$ [rad/s].

*Exemplo:* cobre com $d=5$ mm dá $v_c\approx5{,}3$ m/s. A dependência de $c_g$ com o entreferro e com as dimensões do polo deve ser obtida de [10] ou de FEM [14][18].

**Circuito equivalente e curva de Wouterse.** Modela-se o caminho das correntes parasitas como uma espira em curto, de resistência $R_e$ e indutância $L_e$, sujeita a uma fem de amplitude $E_m=k_\phi\,\omega$ e frequência elétrica $\omega_e=p\,\omega$. A potência dissipada é $P=\tfrac12R_e|I|^{2}$ e o torque é $T_b=P/\omega$:

$$
T_b=\frac{k_\phi^{2}}{2R_e}\,\frac{\omega}{1+x^{2}}=2\,T_{max}\,\frac{x}{1+x^{2}}=\frac{2\,T_{max}}{\dfrac{\omega}{\omega_c}+\dfrac{\omega_c}{\omega}},\qquad
x=\frac{\omega}{\omega_c},\quad \omega_c=\frac{R_e}{p\,L_e},\quad T_{max}=\frac{k_\phi^{2}}{4\,p\,L_e}
$$

- $k_\phi$: constante de fem [V·s/rad]; $R_e$: resistência equivalente do caminho de Foucault [Ω]; $L_e$: indutância equivalente [H]; $p$: pares de polos [adimensional].
- $\omega_c$: velocidade crítica [rad/s]; $T_{max}$: torque máximo, em $\omega=\omega_c$ [N·m]; $x$: velocidade normalizada [adimensional].

Esta é a mesma forma funcional que Wouterse obteve analiticamente e confirmou experimentalmente para polos de ferro doce bem separados [10]. É também o análogo do torque × escorregamento da máquina de indução, com $R_e/L_e$ fazendo o papel de $R_r'/X_r'$ [5][6]. O modelo é de parâmetros concentrados: $R_e$ e $L_e$ são constantes, o que é uma abstração para o disco real [10][14].

- **Regime resistivo** ($\omega\ll\omega_c$): $T_b\simeq\dfrac{k_\phi^{2}}{2R_e}\,\omega$. A reatância é desprezível, a corrente está em fase com a fem e o torque é linear em $\omega$.
- **Regime indutivo** ($\omega\gg\omega_c$): $T_b\simeq\dfrac{k_\phi^{2}}{2p^{2}L_e^{2}}\,\dfrac{R_e}{\omega}=2T_{max}\,\dfrac{\omega_c}{\omega}$. A corrente é limitada pela reatância e se atrasa da fem. O campo da própria corrente (reação de armadura) enfraquece o campo líquido e o torque decresce com $1/\omega$.

**Dinâmica de frenagem.** Para uma inércia $J_m$ [kg·m²] e sem carga externa, $J_m\,\dot\omega=-T_b(\omega)$. No regime resistivo, $\omega(t)=\omega_0e^{-t/\tau_m}$, com $\tau_m=J_m/k_\omega$ e $k_\omega=k_\phi^{2}/(2R_e)$ [N·m·s/rad]. Para a curva completa, integrando com $a=2T_{max}/(J_m\omega_c)$ [s⁻¹]:

$$
\ln x+\frac{x^{2}}{2}=\ln x_0+\frac{x_0^{2}}{2}-a\,t
$$

A velocidade tende a zero apenas assintoticamente, coerente com $T_b(0)=0$: o freio de correntes parasitas não completa a parada por si só [9][10].

### 3.4 Conversão energética e dissipação térmica

**Taxa de conversão.** A potência mecânica extraída é convertida integralmente em calor por efeito Joule no condutor [3]:

$$
P_b=T_b\,\omega=\int_V\frac{|\vec{J}|^{2}}{\sigma}\,dV,\qquad
E_k=\frac{1}{2}\,J_m\,\omega_0^{2}=\int_0^{\infty}P_b\,dt
$$

- $P_b$: potência dissipada [W]; $E_k$: energia cinética inicial a ser absorvida [J]; $\omega_0$: velocidade inicial [rad/s].

**Difusão de calor no elemento condutor.** Em coordenadas fixas ao laboratório, o disco em rotação carrega o calor com sua velocidade $\vec{v}$. A equação de energia é [36][37]:

$$
\rho_m\,c_p\left(\frac{\partial\theta}{\partial t}+\vec{v}\cdot\nabla\theta\right)=\nabla\cdot\left(k_t\nabla\theta\right)+\frac{|\vec{J}|^{2}}{\sigma}
$$

com condição de contorno de convecção e radiação nas faces:

$$
-k_t\,\frac{\partial\theta}{\partial n}=h_c\left(\theta-\theta_\infty\right)+\varepsilon\,\sigma_{SB}\left(\theta^{4}-\theta_\infty^{4}\right)
$$

- $\theta$: temperatura [K]; $\rho_m$: massa específica [kg/m³]; $c_p$: calor específico [J/(kg·K)]; $k_t$: condutividade térmica [W/(m·K)].
- $\vec{v}\cdot\nabla\theta$: termo advectivo devido à rotação; $|\vec{J}|^{2}/\sigma$: geração volumétrica de calor [W/m³].
- $h_c$: coeficiente de convecção [W/(m²·K)]; $\varepsilon$: emissividade [adimensional]; $\sigma_{SB}=5{,}67\times10^{-8}$ W/(m²·K⁴); $\theta_\infty$: temperatura ambiente [K].

Como a fonte está concentrada sob o polo e o material passa por ela em alta velocidade, o número de Péclet circunferencial é grande. O calor se espalha na direção angular, e o disco se aquece como um anel de temperatura aproximadamente uniforme em $\theta$ [36][37].

**Modelo concentrado (Bi < 0,1).** Com $m$ a massa do rotor e $A$ a área de troca [37]:

$$
m\,c_p\,\frac{d\theta}{dt}=P_b(t)-h_{eq}A\left(\theta-\theta_\infty\right)
\;\Rightarrow\;
\theta(t)=\theta_\infty+\frac{P_b}{h_{eq}A}\left(1-e^{-t/\tau_{th}}\right),\quad \tau_{th}=\frac{m\,c_p}{h_{eq}A}
$$

- $h_{eq}$: coeficiente equivalente convecção + radiação [W/(m²·K)]; $\tau_{th}$: constante de tempo térmica [s]; a solução vale para $P_b$ constante.

Numa frenagem rápida (adiabática), $\Delta\theta=E_k/(m\,c_p)$ [K]. *Exemplo:* $J_m=2$ kg·m² e $\omega_0=314$ rad/s (3000 rpm) dão $E_k\approx98{,}7$ kJ. Absorvidos por um disco de alumínio de 5 kg ($c_p\approx900$ J/(kg·K)), $\Delta\theta\approx22$ K [37].

---

## 4. Projeto Mecânico, Materiais e Gestão Térmica

### 4.1 Seleção de materiais do rotor: $\mu_r$ × $\sigma$

Valores típicos a 20 °C. Confirme na folha de dados do fornecedor antes de projetar [1][2][37].

| Material | $\sigma$ [S/m] | $\rho_m$ [kg/m³] | $c_p$ [J/(kg·K)] | $k_t$ [W/(m·K)] | $\mu_r$ |
|---|---|---|---|---|---|
| Cobre | $5{,}96\times10^{7}$ | 8960 | 385 | ≈ 400 | ≈ 1 |
| Alumínio | $\approx3{,}5\times10^{7}$ | 2700 | ≈ 900 | ≈ 237 | ≈ 1 |
| Aço-carbono maciço | $\approx(0{,}6\text{–}1)\times10^{7}$ | ≈ 7850 | ≈ 450–490 | ≈ 45–60 | $10^{2}$–$10^{3}$ (não linear, satura) [5][6] |

Consequências de projeto, derivadas de 3.2 e 3.3:

- **Torque em baixa velocidade** $\propto\sigma d$. Por volume, o cobre supera o alumínio. Por massa, o alumínio leva vantagem, pois $\sigma/\rho_m\approx1{,}3\times10^{4}$ S·m²/kg contra $6{,}7\times10^{3}$ do cobre.
- **Inércia térmica volumétrica** $\rho_m c_p$: cobre ≈ 3,45 MJ/(m³·K); alumínio ≈ 2,43 MJ/(m³·K). O cobre absorve mais energia por volume, o que favorece frenagens curtas e intensas [37].
- **Velocidade crítica** $\omega_c\propto1/(\sigma d)$: maior $\sigma d$ desloca o pico de torque para velocidades menores, o que é desejável em aplicações de baixa rotação.
- **Rotor ferromagnético** ($\mu_r\gg1$): faz parte do circuito magnético e reduz a relutância, mas tem $\delta_s$ pequeno, perdas de histerese e saturação. Configurações mistas, com aço para o fluxo e camada de cobre para a corrente, são analisadas em [16][18]. Ranhuras axiais no rotor também alteram a característica torque × velocidade, pelo controle do efeito de extremidade [18].

### 4.2 Influência do entreferro: decaimento exponencial

Em região sem fontes, o campo de uma fileira periódica de polos com passo polar $\tau_p$ satisfaz $\nabla^{2}\psi=0$ (potencial escalar magnético). A separação de variáveis dá [1][4]:

$$
B_z(x,z)=B_0\cos(kx)\,e^{-kz},\qquad k=\frac{\pi}{\tau_p}
$$

- $B_0$: amplitude na face do polo [T]; $x$: coordenada ao longo da fileira de polos [m]; $z$: distância normal à face [m]; $k$: número de onda [m⁻¹]; $\tau_p$: passo polar [m].

Como $T_b\propto B^{2}$ e a espessura $d$ do condutor amostra o campo entre $g$ e $g+d$, em baixa velocidade e sem reação de armadura:

$$
T_b(g)\;\propto\;e^{-2kg}\,\frac{1-e^{-2kd}}{2kd}
$$

- $g$: entreferro entre a face do polo e o disco [m]; $d$: espessura do disco [m].

*Exemplo:* com $\tau_p=30$ mm ($k\approx105$ m⁻¹), dobrar o entreferro de 2 para 4 mm reduz o torque de baixa velocidade em cerca de 34%. Para polos largos, com circuito magnético fechado por ferro e $NI$ constante, vale a expressão de 3.2(c), em que $B_z\propto1/(2g+d+\dots)$ e $T_b\propto B_z^{2}$ [1][5]. Entreferros pequenos aumentam o torque, mas exigem tolerâncias mecânicas rígidas, e a dilatação térmica do disco pode fechar o entreferro.

### 4.3 Degradação da eficiência com a temperatura

A resistividade de metais varia quase linearmente com a temperatura [5][6]:

$$
\rho_e(\theta)=\rho_{e,20}\left[1+\alpha\left(\theta-20\right)\right],\qquad
\sigma(\theta)=\frac{\sigma_{20}}{1+\alpha\left(\theta-20\right)}
$$

- $\rho_e=1/\sigma$: resistividade [Ω·m]; $\theta$: temperatura [°C]; $\alpha$: coeficiente de temperatura da resistividade a 20 °C [K⁻¹].
- Para o cobre, $\alpha\approx3{,}93\times10^{-3}$ K⁻¹, equivalente à forma $\rho_e\propto(234{,}5+\theta)$ usada em [5][6]. Para o alumínio, $\alpha\approx4\times10^{-3}$ K⁻¹ (valor típico).

Efeitos sobre o modelo de 3.3:

- $R_e\propto1/\sigma$ ⇒ $\omega_c=R_e/(pL_e)$ **aumenta** com a temperatura, enquanto $T_{max}=k_\phi^{2}/(4pL_e)$ fica praticamente inalterado. A curva $T\times\omega$ desloca-se para a direita, com o mesmo pico.
- O torque em baixa velocidade cai proporcionalmente a $\sigma$, e a inclinação $k_\omega=k_\phi^{2}/(2R_e)$ diminui. Acima de $\omega_c$, o torque tende a aumentar levemente.
- *Exemplo:* cobre a 200 °C tem $\rho_e$ 1,71 vezes maior que a 20 °C ($\sigma$ cai a 59%), e $\omega_c$ sobe 71%. O torque de baixa velocidade cai 41%.
- Se a bobina for alimentada em tensão constante, o aquecimento do cobre da bobina aumenta $R$ e reduz $I$ e $NI$, e $T_b\propto(NI)^{2}$ acompanha [5][6].
- Em excitação por ímãs permanentes, a indução remanente cai com a temperatura e pode haver desmagnetização irreversível acima do limite do ímã [†].

**Gestão térmica.** Combine (i) massa térmica suficiente para $E_k$ da frenagem (seção 3.4), (ii) superfície de troca, com aletas, canais de ventilação (rotor ventilado) ou refrigeração líquida, como nos retardadores veiculares [17], e (iii) monitoramento de temperatura, com redução de corrente ou aviso ao operador. No trilho, o aquecimento localizado é um problema de infraestrutura (seção 5.1) [21][27].

---

## 5. Aplicações Industriais e Avançadas

### 5.1 Trens de alta velocidade e sistemas Maglev

O freio linear de correntes parasitas é independente da aderência roda–trilho, não desgasta e tem características de força favoráveis na faixa alta de velocidade. Por isso foi escolhido para o ICE alemão de alta velocidade [20]. Sua primeira aplicação comercial foi no ICE 3 da Deutsche Bahn [21]. Essa operação revelou dois problemas de compatibilidade com a infraestrutura: o **aquecimento do boleto do trilho**, com risco de flambagem, e a **interferência em sistemas de sinalização**, como os contadores de eixo [21][27]. O projeto europeu ECUC desenvolveu modelos eletromagnéticos e térmicos, validou-os com ensaios do ICE 3 e não encontrou, nos contadores de eixo e sensores de roda testados, defeito de funcionamento causado pelo freio [27].

A literatura de projeto inclui a análise de freios de correntes parasitas para ferrovia de alta velocidade [22], o projeto de freio linear sem contato [23], a excitação híbrida (ímãs + bobinas) que alivia a saturação dos dentes [24] e a otimização multiobjetivo de freios lineares de ímãs permanentes com secundário em gaiola para trânsito ferroviário de alta velocidade [26]. O RTRI (Japão) estudou um "freio de trilho linear" derivado da tecnologia de motor linear, para reduzir a elevação de temperatura do trilho [45]. Para Maglev de alta velocidade, a força de pico e a velocidade crítica do freio são analisadas em [25], e o freio linear é tido como meio de emergência independente da rede e da tração [†].

- **Shinkansen:** relatos técnicos indicam freios de correntes parasitas circulares (de disco) nos reboques da série 100 e posterior abandono na série N700, em favor da frenagem regenerativa [†].
- **TGV:** não localizei fonte acadêmica que sustente o uso de freio de correntes parasitas no TGV, e por isso não faço afirmação a respeito.

### 5.2 Montanhas-russas e elevadores de queda livre

Com excitação por ímãs permanentes, o freio de correntes parasitas não precisa de alimentação: a força frenante surge da própria velocidade ($T_b\propto\omega$ no regime resistivo). Trata-se de segurança **passiva intrínseca**, que decorre da física de 3.3 [9][10]. Como $T_b(0)=0$, ele não completa a parada nem segura carga. A parada final e a retenção são feitas por freio de atrito ou de mola [10][38]. Em montanhas-russas e torres de queda, o arranjo típico usa aletas condutoras (Cu/Al) passando entre fileiras de ímãs [†]. No caso de elevadores, exige-se demonstrar a conformidade com os requisitos de frenagem e proteção contra sobrevelocidade da EN 81-20 [41]. Em brinquedos de parque, aplicam-se os requisitos de projeto da ASTM F2291 [42].

### 5.3 Dinamômetros veiculares e de bancada

O freio de correntes parasitas serve como carga controlável em bancos de ensaio de motores, por seu torque suave e controlável pela corrente de excitação. Um freio de alta velocidade acoplado a um motor em bancada é caracterizado em regime permanente por [18], e modelos com controle de torque em malha fechada aparecem em [15]. Retardadores eletromagnéticos veiculares e sua modelagem estão em [16][17]. Em ambos os casos, a potência contínua é limitada pela dissipação térmica (seção 3.4). Freios de histerese e de partícula magnética servem a bancadas de pequena potência, com torque bem regulável [†].

### 5.4 Equipamentos de precisão

Freios de correntes parasitas foram projetados, identificados e controlados para interfaces hápticas, onde é essencial um atuador de torque controlável e sem contato [19]. Em instrumentação, freios de histerese e de partícula magnética oferecem torque estável e repetível, controlado pela corrente [29][33].

### 5.5 Equipamentos médicos e esteiras industriais

Freios magnetorreológicos rotativos são documentados em equipamentos de exercício e outras aplicações de resistência controlável [33][34]. Freios de correntes parasitas em ergômetros e equipamentos de reabilitação são uma aplicação usual [†]. Em esteiras e transportadores industriais, o freio de mola com liberação eletromagnética (2.4) realiza a parada segura e a retenção com falha segura, enquadrada por [39][40]. Freios de histerese e de partícula controlam a tensão de fita e fio [†].

---

## 6. Análise Comparativa (Freios Eletromagnéticos × Freios por Fricção)

| Critério | ECB (correntes parasitas) | Histerese / Partícula magnética | Fricção convencional (inclui mola-aplicado) |
|---|---|---|---|
| **Desgaste físico** | Sem contato no par de frenagem; sem desgaste do elemento frenante [20][27] | Histerese: sem contato. Partícula: desgaste e envelhecimento do pó/fluido [33][†] | Desgaste do revestimento é inerente ao princípio [38] |
| **Custo de manutenção** | Baixo: sem troca de pastilhas. Exige manutenção de alimentação e arrefecimento [27] | Baixo a médio; troca do pó/fluido em partículas [†] | Troca periódica de revestimentos e ajuste de folgas [38] |
| **Tempo de resposta** | Limitado por $L/R$ da bobina (ms a dezenas de ms) [34]. Sem excitação, passivo | Milissegundos em partícula/MR [34]. Histerese limitada por $L/R$ [†] | Depende do atuador (mola, pneumático, hidráulico). No mola-aplicado, dominado pelo decaimento da corrente [5][†] |
| **Desempenho em alta velocidade** | Torque cai com $1/\omega$ acima de $\omega_c$ [10]. Em trilho linear, força alta e aproximadamente estável em alta velocidade [20][23] | Torque aproximadamente constante, mas $P=T\omega$ limita a operação contínua [29][31] | Fade térmico e queda do coeficiente de atrito com a temperatura [38] |
| **Parada estática (torque em $\omega=0$)** | **Nulo** [9][10] | Sim: histerese (limite pela remanência) [31]; partícula ($\tau_y$) [33] | Sim, máximo [38] |
| **Complexidade do arrefecimento** | Alta em regime contínuo: dissipação no rotor/trilho [17][21] | Média: calor no anel ou no entreferro [†] | Média a alta: dissipação em discos e pastilhas [38] |

**Síntese.** Os freios eletromagnéticos brilham onde o desgaste, a manutenção, a aderência e o controle fino do torque dominam o projeto. O ECB é o mais adequado a altas velocidades e a serviço repetitivo, por não ter contato. Ele é inadequado para reter carga e depende de um freio de atrito ou de mola para a parada final [10][20]. Os freios de histerese e de partícula oferecem torque controlável e quase independente da velocidade, mas com potência de escorregamento limitada [29][33]. Os freios por fricção continuam indispensáveis para retenção estática e parada final. A solução industrial comum é **híbrida**: eletromagnético para a maior parte da energia e fricção ou mola para reter e para a segurança [38][39].

---

## 7. Referências Bibliográficas

*Padrão IEEE. "Livro" indica ausência de DOI. Os DOIs listados sem a marca "(DOI a confirmar)" apareceram em resultados de busca (página do periódico ou lista de referências de outro artigo), e convém validá-los em doi.org antes de submeter. Onde não há DOI, dá-se o link indexador ou a indicação de base.*

**[1]** W. H. Hayt Jr. and J. A. Buck, *Engineering Electromagnetics*, 8th ed. New York, NY, USA: McGraw-Hill, 2012. (Livro.)

**[2]** M. N. O. Sadiku, *Elements of Electromagnetics*, 7th ed. New York, NY, USA: Oxford Univ. Press, 2018. (Livro.)

**[3]** D. J. Griffiths, *Introduction to Electrodynamics*, 4th ed. Cambridge, U.K.: Cambridge Univ. Press, 2017. DOI: 10.1017/9781108333511 (DOI a confirmar).

**[4]** J. D. Jackson, *Classical Electrodynamics*, 3rd ed. New York, NY, USA: Wiley, 1999. (Livro.)

**[5]** A. E. Fitzgerald, C. Kingsley Jr., and S. D. Umans, *Electric Machinery*, 6th ed. New York, NY, USA: McGraw-Hill, 2003. (Livro.)

**[6]** S. J. Chapman, *Electric Machinery Fundamentals*, 5th ed. New York, NY, USA: McGraw-Hill, 2012. (Livro.)

**[7]** W. R. Smythe, "On eddy currents in a rotating disk," *Trans. AIEE*, vol. 61, pp. 681–684, Sep. 1942. (DOI a confirmar; sem DOI localizado.)

**[8]** D. Schieber, "Unipolar induction braking of thin metal sheets," *Proc. IEE*, vol. 119, no. 10, pp. 1499–1503, Oct. 1972. (DOI a confirmar; IET Digital Library.)

**[9]** D. Schieber, "Braking torque on rotating sheet in stationary magnetic field," *Proc. IEE*, vol. 121, no. 2, pp. 117–122, 1974. (DOI a confirmar; IET Digital Library.)

**[10]** J. H. Wouterse, "Critical torque and speed of eddy current brake with widely separated soft iron poles," *IEE Proc. B – Electr. Power Appl.*, vol. 138, no. 4, pp. 153–158, Jul. 1991. (DOI a confirmar; IET Digital Library.)

**[11]** H. D. Wiederick, N. Gauthier, D. A. Campbell, and P. Rochon, "Magnetic braking: Simple theory and experiment," *Am. J. Phys.*, vol. 55, no. 6, pp. 500–503, Jun. 1987. DOI: 10.1119/1.15103.

**[12]** M. A. Heald, "Magnetic braking: Improved theory," *Am. J. Phys.*, vol. 56, no. 6, pp. 521–522, Jun. 1988. DOI: 10.1119/1.15570.

**[13]** J. A. Redinz, "Analytical results for rotating and linear magnetic brakes," *Adv. Electromagn.*, vol. 7, no. 1, Feb. 2018. Disponível em: https://aemjournal.org/index.php/AEM/article/view/610

**[14]** K. Lee and K. Park, "Modeling eddy currents with boundary conditions by using Coulomb's law and the method of images," *IEEE Trans. Magn.*, vol. 38, no. 2, pp. 1333–1340, Mar. 2002. (DOI a confirmar; IEEE Xplore.)

**[15]** E. Simeu and D. Georges, "Modeling and control of an eddy current brake," *Control Eng. Pract.*, vol. 4, no. 1, pp. 19–26, 1996. DOI: 10.1016/0967-0661(95)00202-4.

**[16]** S. Anwar, "A parametric model of an eddy current electric machine for automotive braking applications," *IEEE Trans. Control Syst. Technol.*, vol. 12, no. 3, pp. 422–427, May 2004. (DOI a confirmar; IEEE Xplore.)

**[17]** L. Ye, G. Yang, and D. Li, "Analytical model and finite element computation of braking torque in electromagnetic retarder," *Front. Mech. Eng.*, vol. 9, no. 4, pp. 368–379, 2014. DOI: 10.1007/s11465-014-0314-x.

**[18]** T. Garbiec, M. Kowol, and J. Kołodziej, "Design considerations of high-speed eddy-current brake," *Arch. Electr. Eng.*, vol. 63, no. 2, pp. 295–304, 2014. DOI: 10.2478/aee-2014-0022.

**[19]** A. H. C. Gosline and V. Hayward, "Eddy current brakes for haptic interfaces: Design, identification, and control," *IEEE/ASME Trans. Mechatronics*, vol. 13, pp. 669–677, 2008. (DOI a confirmar; IEEE Xplore.)

**[20]** U. Kröger, "Principles, development and design of the linear eddy-current brake," *Glasers Annalen ZEV*, vol. 109, no. 9, pp. 368–374, Sep. 1985. Disponível em: https://trid.trb.org/View/276099

**[21]** J. Gräber, M. Kunz, L. Kinze, and W. D. Meier-Credner, "Experiences with the operation of the linear eddy-current brake (LEB) in the ICE 3 with respect to the interaction between LEB and infrastructure," DB Systemtechnik, 2003. Disponível em: https://www.rssb.co.uk/spark/sparkitem/pb004344

**[22]** P. J. Wang and S. J. Chiueh, "Analysis of eddy-current brakes for high speed railway," *IEEE Trans. Magn.*, vol. 34, no. 4, pp. 1237–1239, Jul. 1998. DOI: 10.1109/20.706507.

**[23]** K. H. Ha, J. P. Hong, G. T. Kim, J. Lee, and D. H. Kang, "A study of the design for touch free linear eddy current brake," *IEEE Trans. Magn.*, vol. 35, 1999. DOI: 10.1109/20.800745.

**[24]** B. Kou, Y. Jin, L. Zhang, and H. Zhang, "Characteristic analysis and control of a hybrid excitation linear eddy current brake," *Energies*, vol. 8, no. 7, pp. 7441–7464, 2015. DOI: 10.3390/en8077441.

**[25]** C. Chen, J. Xu, X. Yuan, and X. Wu, "Characteristic analysis of the peak braking force and the critical speed of eddy current braking in a high-speed Maglev," *Energies*, vol. 12, no. 13, art. 2622, 2019. (DOI a confirmar; MDPI.)

**[26]** W. Chen, B. Kou, M. Wang, and X. Niu, "Speed-based multiobjective optimisation of a cage-secondary permanent magnet linear eddy current brake," *Int. J. Syst. Sci.*, vol. 54, no. 4, pp. 835–848, Mar. 2023. DOI: 10.1080/00207721.2022.2146989.

**[27]** European Commission, "Final Report Summary – ECUC (Eddy CUrrent Brake Compatibility)," CORDIS, project ID 314244. Disponível em: https://cordis.europa.eu/project/id/314244/reporting/es

**[28]** C. P. Steinmetz, "On the law of hysteresis," *Trans. AIEE*, vol. 9, pp. 3–64, 1892; reimpr. em *Proc. IEEE*, vol. 72, no. 2, pp. 197–221, Feb. 1984. DOI: 10.1109/PROC.1984.12842 (DOI a confirmar).

**[29]** G. Bertotti, "General properties of power losses in soft ferromagnetic materials," *IEEE Trans. Magn.*, vol. 24, no. 1, pp. 621–630, Jan. 1988. DOI: 10.1109/20.43994 (DOI a confirmar).

**[30]** D. C. Jiles and D. L. Atherton, "Theory of ferromagnetic hysteresis," *J. Magn. Magn. Mater.*, vol. 61, no. 1–2, pp. 48–60, 1986. DOI: 10.1016/0304-8853(86)90066-1 (DOI a confirmar).

**[31]** M. A. Copeland and G. R. Slemon, "An analysis of the hysteresis motor I — Analysis of the idealized machine," *IEEE Trans. Power App. Syst.*, vol. 82, pp. 34–42, 1963. (DOI a confirmar; IEEE Xplore.)

**[32]** J. Rabinow, "The magnetic fluid clutch," *AIEE Trans.*, vol. 67, 1948 (intervalo de páginas varia entre fontes; ver também *NBS Tech. News Bull.*, vol. 33, no. 4, pp. 54–60, 1948). (DOI a confirmar.)

**[33]** M. R. Jolly, J. W. Bender, and J. D. Carlson, "Properties and applications of commercial magnetorheological fluids," *J. Intell. Mater. Syst. Struct.*, vol. 10, no. 1, pp. 5–13, 1999. DOI: 10.1177/1045389X9901000102.

**[34]** J. D. Carlson and M. R. Jolly, "MR fluid, foam and elastomer devices," *Mechatronics*, vol. 10, no. 4–5, pp. 555–569, 2000. DOI: 10.1016/S0957-4158(99)00064-1.

**[35]** M. R. Jolly, J. D. Carlson, and B. C. Muñoz, "A model of the behaviour of magnetorheological materials," *Smart Mater. Struct.*, vol. 5, no. 5, pp. 607–614, 1996. DOI: 10.1088/0964-1726/5/5/009.

**[36]** H. S. Carslaw and J. C. Jaeger, *Conduction of Heat in Solids*, 2nd ed. Oxford, U.K.: Oxford Univ. Press, 1959. (Livro; complementar.)

**[37]** F. P. Incropera, D. P. DeWitt, T. L. Bergman, and A. S. Lavine, *Fundamentals of Heat and Mass Transfer*, 7th ed. Hoboken, NJ, USA: Wiley, 2011. (Livro; complementar.)

**[38]** R. G. Budynas and J. K. Nisbett, *Shigley's Mechanical Engineering Design*, 10th ed. New York, NY, USA: McGraw-Hill, 2015. (Livro; complementar.)

**[39]** IEC 61800-5-2:2016, *Adjustable speed electrical power drive systems – Part 5-2: Safety requirements – Functional*. Geneva, Switzerland: IEC, 2016. (Norma.)

**[40]** ISO 13849-1:2023, *Safety of machinery – Safety-related parts of control systems – Part 1: General principles for design*. Geneva, Switzerland: ISO, 2023. (Norma.)

**[41]** EN 81-20:2020, *Safety rules for the construction and installation of lifts – Lifts for the transport of persons and goods – Part 20*. Brussels, Belgium: CEN, 2020. (Norma.)

**[42]** ASTM F2291, *Standard Practice for Design of Amusement Rides and Devices*. West Conshohocken, PA, USA: ASTM Int. (Norma; conferir a edição vigente.)

**[43]** Virginia Tech, VTechWorks, capítulo de tese sobre modelos de freio de correntes parasitas (Smythe, Schieber, Wouterse), handle 10919/30598. Disponível em: https://vtechworks.lib.vt.edu/bitstream/handle/10919/30598/CHAP2_DOC.pdf (autor e título da tese não identificados na fonte consultada.)

**[44]** I. Boldea and S. A. Nasar, *Linear Electric Actuators and Generators*. Cambridge, U.K.: Cambridge Univ. Press, 1997. (Livro.)

**[45]** Y. Sakamoto, "Development of a rail brake for railway vehicles derived from linear motor technology," Railway Technical Research Institute (RTRI), JMAG Users Conf., 2014. Disponível em: https://www.jmag-international.com/conference_doc/uc2014_16
