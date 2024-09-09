/**
 * @copyright 2024
 * @author Tailor Mavoungou
 */
import {MBInputField} from "../textfield/internal/input-field";
import {MBClock} from "../datetime/mb-clock";

export class MBTimePicker extends MBInputField{

  private clock: MBClock|null = null

  get time(): Date | null {
    return this.clock != null ? this.clock.time : null;
  }

  set time(value: Date | null) {
    if (this.clock != null) this.clock.time = value
  }

  protected override render(): string {
    return (super.render() + '<div class="mb-time-picker-clock"><mb-clock class="popup-common-effect" /></div>');
  }

  protected override initvar() {
    super.initvar();
    this.field?.classList.add('dropdown')
    this.input!!.style.cursor = 'pointer'
    this.input!!.setAttribute('readonly', 'readonly')
    this.dropdown!!.textContent = 'alarm'
    this.clock = this.querySelector<MBClock>('.mb-time-picker-clock mb-clock')
    this.clock!!.onexit = this.onclockexit
    this.clock!!.onvalidate = this.onclockvalidate
  }

  protected override oninputclick(e: Event) {
    super.oninputclick(e);
    if (this.classList.contains('feature')) this.classList.remove('feature')
    else this.classList.add('feature')
  }

  protected override oninputblur(e: Event) {
    super.oninputblur(e);
    if (this.isempty != null) {
      const regex = new RegExp("[0-9]{1,2}:[0-9]{1,2}")
      if (regex.test(this.input!!.value)) {
        const part = this.input!!.value.split(':')
        const hour = Number.parseInt(part[0].trim()), minute = Number.parseInt(part[1].trim())
        const date = new Date()
        date.setHours(hour)
        date.setMinutes(minute)
        this.clock!!.time = date
      } else {
        this.input!!.value = ''
      }
    }
  }

  protected override onwindowclick(e: Event) {
    super.onwindowclick(e);
    const element = e.target as HTMLElement
    if (element != this && element != this.dropdown && element != this.input) {
      this.classList.remove('feature')
    }
  }

  private onclockexit = () : void => {
    this.classList.remove('feature')
  }

  private onclockvalidate = () : void => {
    this.input!!.value = this.clock!!.tostring()
    this.classList.remove('feature')
  }

}

customElements.define('mb-time-picker', MBTimePicker)
