/**
 * @licence
 * @author Tailor Mavoungou
 * Copyright 2024
 */
import {MBElement} from "../../all";

export abstract class MBInputField extends MBElement{

  protected input: HTMLInputElement|HTMLTextAreaElement|null = null
  protected errorIcon: HTMLSpanElement|null = null
  protected control: HTMLDivElement|null = null
  protected field: HTMLDivElement|null = null
  protected errorWrapper: HTMLDivElement|null = null
  protected errorText: HTMLSpanElement|null = null
  protected dropdown: HTMLSpanElement|null = null

  protected label: string = ''
  protected value:string = ''
  protected type: string = 'text'
  protected name:string = ''
  protected required: boolean = false
  public isempty: boolean|null = null

  private _error:string = ''
  get error(): string { return this._error;}
  set error(value: string) { this._error = value; if (this.errorText != null) this.errorText!!.textContent = value}

  override set isEnabled(value: boolean) {
    this.isEnabled = value;
    if (this.input != null) {
      if (value) this.input!!.removeAttribute('disabled')
      else this.input!!.setAttribute('disabled', 'true')
    }
  }

  get text(): string {
    return this.input!!.value;
  }

  set text(value: string) {
    this.input!!.value = value;
  }

  protected override attr() {
    this.label = this.getAttribute('label') ?? ''
    this.value = this.getAttribute('text') ?? ''
    this.name = this.getAttribute('name') ?? ''
    this.error = this.getAttribute('error') ?? 'Champs invalid'
    const tmp_required = this.getAttribute('required') ?? 'false'
    this.required = tmp_required.trim().toLowerCase() == 'true'
  }

  protected override render() : string {
    return '<div class="mb-input-field">'+
      '<span class="mb-input-field-label">'+this.label+'</span>'+
      '<div class="mb-input-field-form-control">' +
        this.initinput()+//(this.type.trim().toLowerCase() == 'textarea' ? '<textarea class="input" placeholder="'+this.label+'" '+ this.required ? 'required' : '' +' ></textarea>' : '<input class="input" type="'+this.type+'" placeholder="'+this.label+'" '+ this.required ? "required" : "" +' />')+
      '<span class="material-symbols-outlined dropdown">arrow_drop_down</span>'+
      '<span class="material-symbols-outlined error-icon">error</span>'+
      '</div>' +
      '<div class="mb-input-field-error-label"><span>'+this.error+'</span></div>'+
      '</div>'
  }

  protected override initvar() {
    this.field = this.querySelector<HTMLDivElement>('.mb-input-field')
    this.control = this.querySelector<HTMLDivElement>('.mb-input-field-form-control')
    this.errorWrapper = this.querySelector<HTMLDivElement>('.mb-input-field-error-label')
    this.input = this.querySelector<HTMLInputElement|HTMLTextAreaElement>('.input')
    this.errorIcon = this.control!!.querySelector('span.error-icon')
    this.errorText = this.errorWrapper!!.querySelector<HTMLSpanElement>('span')
    this.dropdown = this.querySelector<HTMLSpanElement>('span.dropdown')
  }

  protected override initlistener() {
    this.input!!.addEventListener('focus', ev => this.oninputfocus(ev))
    this.input!!.addEventListener('blur', ev => this.oninputblur(ev))
    this.input!!.addEventListener('input', (e) => this.ontextinput(e))
    this.addEventListener('click', e => this.onviewclick(e))
    this.errorIcon!!.addEventListener('click', ev => this.showerror(ev))
    window.addEventListener('click', e => this.onwindowclick(e))
  }

  private initinput() : string {
    if (this.type.trim().toLowerCase() == 'textarea')
      return '<textarea class="input" name="'+this.name+'" placeholder="'+this.label+'" '+ (this.required ? "required" : "") +'>'+this.value+'</textarea>'
    else
      return '<input class="input" name="'+this.name+'" value="'+this.value+'"  type="'+this.type+'"  placeholder="'+this.label+'" '+ (this.required ? "required" : "") +'/>'
  }

  protected oninputfocus (e: Event) {
    e.stopPropagation()
    if (!this.isEnabled) this.field?.classList.add('focus')
  }

  protected oninputblur(e: Event){
    e.stopPropagation()
    if (!this.isEnabled) {
      this.field?.classList.remove('focus')
      if (this.isempty != null) {
        if (this.input!!.value == '') this.field?.classList.add('error')
        else this.field?.classList.remove('error')
      }
    }
  }

  private onviewclick(e:Event) : void {
    if (!this.isEnabled) {
      const element = e.target as HTMLElement
      if (element != this.errorIcon) this.oninputclick(e)
    }
  }


  protected oninputclick(e: Event) {
  }

  protected ontextinput(e: Event) : void {
    if (!this.isEnabled)
    {
      this.field?.classList.remove('error')
      this.errorWrapper?.classList.remove('error')
      this.isempty = this.input!!.value == '';
    }
  }

  protected onwindowclick(e : Event) : void {
  }

  private showerror(e: Event) {
    e.stopPropagation()
    if (!this.isEnabled) {
      //alert(this.errorWrapper!!.classList)
      if (this.errorWrapper?.classList.contains('error')) this.errorWrapper?.classList.remove('error')
      else this.errorWrapper?.classList.add('error')
    }
  }

  public enabledError(enabled: boolean = true): void {
    if (enabled) this.field?.classList.add('error')
    else this.field?.classList.remove('error')
  }

}
