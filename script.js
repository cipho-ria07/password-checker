const input=document.querySelector('#password'),rating=document.querySelector('#rating'),summary=document.querySelector('#summary'),bars=[...document.querySelectorAll('.bar')],count=document.querySelector('#count');
const checks=[...document.querySelectorAll('.check')];
const common=new Set(['password','password1','123456789','1234567890','qwerty123','letmein','admin123','welcome1','iloveyou','abc123']);
const hasRepeat=s=>/(.)\1{2,}/u.test(s);
function assess(s){
  if(!s){rating.textContent='—';rating.style.color='';summary.textContent='Your check will appear here as you type.';bars.forEach(b=>b.style.background='');checks.forEach(c=>{c.classList.remove('pass');c.querySelector('.dot').textContent=''});count.textContent='0 of 5';return}
  const flags={length:[...s].length>=8,upper:/[a-z]/.test(s)&&/[A-Z]/.test(s),number:/\d/.test(s),symbol:/[^\p{L}\p{N}\s]/u.test(s),unique:!hasRepeat(s)&&new Set(s.toLowerCase()).size>=6};
  let points=Object.values(flags).filter(Boolean).length;
  const normalized=s.toLowerCase().replace(/[\s._-]/g,'');
  const obvious=common.has(normalized)||/^(.)\1+$/.test(s)||/^(0123|1234|2345|qwerty|asdf)/i.test(s);
  if(obvious)points=Math.min(points,1);
  checks.forEach(c=>{const pass=flags[c.dataset.check];c.classList.toggle('pass',pass);c.querySelector('.dot').textContent=pass?'✓':''});
  const passed=Object.values(flags).filter(Boolean).length;count.textContent=passed+' of 5';
  let level,label,color,message;
  if(obvious){level=1;label='Very weak';color='#b5443f';message='This looks predictable. Try a longer, less familiar passphrase.'}
  else if(points<=1){level=1;label='Weak';color='#b5443f';message='A little more length and variety will make this harder to guess.'}
  else if(points===2){level=2;label='Fair';color='#a7671c';message='A good start. Add a few more of the suggestions to strengthen it.'}
  else if(points<=4){level=3;label='Good';color='#527b49';message='Getting stronger. One more improvement can help.'}
  else{level=4;label='Strong';color='#286747';message='Nice work. Keep it unique to this account.'}
  rating.textContent=label;rating.style.color=color;summary.textContent=message;bars.forEach((b,i)=>b.style.background=i<level?color:'');
}
input.addEventListener('input',()=>assess(input.value));
document.querySelector('#toggle').addEventListener('click',e=>{const showing=input.type==='text';input.type=showing?'password':'text';e.currentTarget.textContent=showing?'Show':'Hide';e.currentTarget.setAttribute('aria-label',showing?'Show password':'Hide password');e.currentTarget.setAttribute('aria-pressed',String(!showing));input.focus()});


