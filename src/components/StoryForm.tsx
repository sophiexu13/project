"use client";
export function StoryPreview({html}:{html:string}){return <div onSubmit={event=>{event.preventDefault();const form=event.target as HTMLFormElement;const status=form.querySelector('[id="formStatus"]');status?.classList.add('visible');status?.setAttribute('role','status');}} dangerouslySetInnerHTML={{__html:html}} />;}
