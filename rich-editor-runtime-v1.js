(() => {
  const labels = [
    ['B','bold'],['I','italic'],['U','underline'],['S','strikeThrough'],
    ['≡','justifyRight'],['☰','justifyCenter'],['☷','justifyLeft'],
    ['🖼','insertImage'],['🎥','video'],['🔗','createLink'],['•','insertUnorderedList'],['1.','insertOrderedList'],
    ['A','foreColor'],['T↕','fontSize'],['❝','formatBlock'],['</>','pre'],['▦','table'],['⌫','removeFormat']
  ];
  const install = () => {
    const textarea = [...document.querySelectorAll('textarea')].find(x => (x.placeholder || '').includes('جزئیات مراحل انجام کار'));
    if (!textarea || textarea.dataset.richInstalled) return;
    textarea.dataset.richInstalled = '1'; textarea.style.display = 'none';
    const wrap = document.createElement('div'); wrap.className = 'rounded-xl border border-gray-300 bg-white overflow-hidden';
    const bar = document.createElement('div'); bar.setAttribute('role','toolbar'); bar.setAttribute('aria-label','ابزارهای ویرایش محتوا'); bar.className='flex flex-wrap gap-1 p-2 border-b bg-gray-50';
    const edit = document.createElement('div'); edit.contentEditable='true'; edit.setAttribute('role','textbox'); edit.setAttribute('aria-multiline','true'); edit.dataset.placeholder=textarea.placeholder; edit.className='p-4 text-right outline-none'; edit.style.minHeight='320px'; edit.dir='rtl'; edit.innerHTML=textarea.value || '';
    const sync = () => { const setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set; setter.call(textarea,edit.innerHTML); textarea.dispatchEvent(new Event('input',{bubbles:true})); textarea.dispatchEvent(new Event('change',{bubbles:true})); };
    const run = (cmd) => { edit.focus(); if(cmd==='insertImage'||cmd==='createLink'||cmd==='video'){const v=prompt(cmd==='insertImage'?'آدرس تصویر':cmd==='video'?'آدرس ویدئو':'آدرس لینک');if(!v)return;document.execCommand(cmd==='video'?'createLink':cmd,false,v)}else if(cmd==='foreColor')document.execCommand(cmd,false,'#2563eb');else if(cmd==='fontSize')document.execCommand(cmd,false,'4');else if(cmd==='formatBlock')document.execCommand(cmd,false,'blockquote');else if(cmd==='pre')document.execCommand('formatBlock',false,'pre');else if(cmd==='table')document.execCommand('insertHTML',false,'<table style="width:100%;border-collapse:collapse"><tr><td style="border:1px solid #ccc;padding:8px">ستون ۱</td><td style="border:1px solid #ccc;padding:8px">ستون ۲</td></tr></table><p><br></p>');else document.execCommand(cmd,false);sync(); };
    labels.forEach(([text,cmd])=>{const b=document.createElement('button');b.type='button';b.textContent=text;b.title=cmd;b.setAttribute('aria-label',cmd);b.className='min-w-9 h-9 px-2 border rounded hover:bg-indigo-50';b.onclick=()=>run(cmd);bar.appendChild(b)});
    edit.addEventListener('input',sync); wrap.append(bar,edit); textarea.after(wrap);
  };
  new MutationObserver(install).observe(document.documentElement,{childList:true,subtree:true}); install();
  document.documentElement.dataset.richEditorRuntime='v1';
})();
