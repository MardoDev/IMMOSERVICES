/**
 * @licence
 * @author Tailor Mavoungou
 * Copyright 2024
 */
import {MBElement} from "../all";

export class MBToggleButton extends MBElement {

  private label: string = ''

  private button: HTMLButtonElement|null = null
  private _oncheckedchangelistener: Function|null = null

  get oncheckedchangelistener(): Function | null {
    return this._oncheckedchangelistener;
  }

  set oncheckedchangelistener(value: Function | null) {
    this._oncheckedchangelistener = value;
  }

  private _checked: boolean = false

  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    this._checked = value;
    if (value) this.classList.add('checked')
    else this.classList.remove('checked')
  }

  override set isEnabled(value: boolean) {
    this.isEnabled = value;
    if (value) this.removeAttribute('disabled')
    else this.setAttribute('disabled', 'true')
  }

  protected attr(): void {
    this.label = this.getAttribute('label') ?? ''
  }

  protected initlistener(): void {
    this.button!!.addEventListener('click', e => this.onswitch(e))
  }

  protected initvar(): void {
    this.button = this.querySelector<HTMLButtonElement>('button')
  }

  protected render(): string {
    return "<button><div onclick='null'><div onclick='null'></div></div><span class='label' onclick='null'>"+this.label+"</span></button>";
  }

  onswitch(e: Event):void {
    e.preventDefault()
    this.checked = !this.checked
    if (this.oncheckedchangelistener != null) this.oncheckedchangelistener()
  }

}

customElements.define('mb-toggle-button', MBToggleButton)
