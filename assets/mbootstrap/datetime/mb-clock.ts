/**
 * @copyright 2024
 * @author Tailor Mavoungou
 */
import {MBElement} from "../all";

export class MBClock extends MBElement{

  private inputs: NodeListOf<HTMLInputElement>|null = null
  private controls: NodeListOf<HTMLSpanElement>|null = null

  private _onvalidate: Function|null = null
  get onvalidate(): Function | null {
    return this._onvalidate;
  }
  set onvalidate(value: Function | null) {
    this._onvalidate = value;
  }

  private _onexit: Function|null = null
  get onexit(): Function | null {
    return this._onexit;
  }
  set onexit(value: Function | null) {
    this._onexit = value;
  }

  private _time: Date|null = null
  get time(): Date | null {
    return this._time;
  }

  set time(value: Date | null) {
    this._time = value;
    if (this.inputs != null && value != null) {
      this.inputs[0].value = (value.getHours() < 10 ? "0" : "") + value.getHours()
      this.inputs[1].value = (value.getMinutes() < 10 ? "0" : "") + value.getMinutes()
    }
  }

  protected attr(): void {
  }

  protected render(): string {
    return "<span class='mb-clock-title'>Entrez l'heure</span>"+
      "<div class='mb-clock-body'>" +
      "<div class='mb-clock-main'>" +
      "<div class='mb-clock-main-hour input-wrapper'>" +
      "<input type='text' maxlength='2' />"+
      "<span>Heure</span>"+
      "</div>"+
      "<span class='mb-clock-divider'>:</span>"+
      "<div class='mb-clock-main-minute input-wrapper'>" +
      "<input type='text' maxlength='2' />"+
      "<span>Minute</span>"+
      "</div>"+
      "</div>"+
      "</div>"+
      "<div class='mb-clock-footer'>" +
      "<span>Annuler</span><span>OK</span>"+
      "</div>";
  }

  protected initlistener(): void {
    this.inputs!!.forEach((value, key) => value.addEventListener('input', _ => this.ontextinput(key)))
    this.controls!!.forEach((value, key) => value.addEventListener('click', e => this.oncontrolclick(e, key)))
    this.addEventListener('click', e => e.stopPropagation())
  }

  protected initvar(): void {
    this.inputs = this.querySelectorAll<HTMLInputElement>('input')
    this.controls = this.querySelectorAll<HTMLSpanElement>('.mb-clock-footer span')
  }

  private ontextinput (index: number) : void {
    const input = this.inputs!![index]
    input.value.replace(/\D/g, '')
    input.value = Number.parseInt(input.value) > (index == 0 ? 23 : 59) ? (index == 0 ? '23' : '59') : input.value
  }

  private oncontrolclick(e: Event, index: number) : void {
    if (index == 0) {
      this.inputs!!.forEach(value => value.value = '')
      if (this.onexit != null) this.onexit();
    }else {
      const hour = Number.parseInt(this.inputs!![0].value), minute = Number.parseInt(this.inputs!![1].value)
      this._time = new Date()
      this._time.setHours(hour)
      this._time.setMinutes(minute)
      if (this.onvalidate != null) this.onvalidate()
    }
  }

  tostring() : string {
    let t = ''
    if (this._time != null) {
      t += ((this._time.getHours() < 10 ? "0" : "") + this._time.getHours())
      t+= ":"
      t+= ((this._time.getMinutes() < 10 ? "0" : "") + this._time.getMinutes())
    }
    return t
  }
}

customElements.define('mb-clock', MBClock)
