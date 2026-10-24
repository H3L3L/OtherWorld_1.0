// ===== SKINS AUTOMÁTICAS (Raça + Gênero → arquivo do GitHub) =====
// Regra: terminação 1 = Feminino, terminação 2 = Masculino.
// >>> TROQUE a URL abaixo pelo caminho real da pasta das skins no seu GitHub <<<
const SKIN_BASE_URL="https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPO/main/assets/skins/";
const SKIN_EXT=".png";
const SKIN_SUFIXO={"Feminino":1,"Masculino":2};            // Não-Binário não tem skin própria → usa o avatar SVG
const SKIN_RACA={"Humano":"woman","Elfo":"elfo","Demônio":"demon"}; // chave = nome da raça em RACAS
const SKIN_BESTIAL=[["bunny","🐰 Coelho"],["fox","🦊 Raposa"],["owl","🦉 Coruja"]]; // raça "Bestial" escolhe a espécie

function skinPrefixo(raca){
  if(raca==="Bestial"){const e=$("f-especie");return e?e.value:SKIN_BESTIAL[0][0]}
  return SKIN_RACA[raca]||null;
}
// Ex.: skinArquivo("Bestial","Feminino") com espécie "bunny" → "bunny_1.png"
function skinArquivo(raca,gen){
  const fr=$("f-raca"),fg=$("f-gen");
  raca=raca||(fr&&fr.value);gen=gen||(fg&&fg.value);
  const pre=skinPrefixo(raca),suf=SKIN_SUFIXO[gen];
  return pre&&suf?pre+"_"+suf+SKIN_EXT:null;
}
// Se a imagem não existir/falhar, mostra o avatar SVG antigo no lugar
const _avSvgBase=avatarSvg;
avatarSvg=function(a,idade){
  const svg=_avSvgBase(a,idade);
  if(!a||!a.skin)return svg;
  return `<img src="${SKIN_BASE_URL}${a.skin}" alt="Skin" style="width:100%;height:100%;object-fit:contain;display:block" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span style="display:none;width:100%;height:100%">${svg}</span>`;
};
(function(){
  const raca=$("f-raca");if(!raca)return;
  const lbl=document.createElement("label");lbl.id="f-especie-lbl";lbl.hidden=true;
  lbl.innerHTML='Espécie Bestial<select id="f-especie">'+SKIN_BESTIAL.map(([v,n])=>`<option value="${v}">${n}</option>`).join("")+'</select>';
  raca.parentElement.insertAdjacentElement("afterend",lbl);
  raca.addEventListener("change",()=>{lbl.hidden=raca.value!=="Bestial";renderApar()});
  $("f-especie").addEventListener("change",renderApar);
  // o gênero já chama renderApar() via onGenero()
})();
