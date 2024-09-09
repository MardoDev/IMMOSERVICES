/**
 * @licence
 * @author Tailor Mavoungou
 * Copyright 2024
 */
import {MBInputField} from "../textfield/internal/input-field";
import {IMBCalendar, MBCalendar} from "../datetime/mb-calendar";

export class MBDatePicker extends MBInputField implements IMBCalendar{

  private feature: HTMLDivElement|null = null
  private calendar: MBCalendar|null = null

  private _date: Date|null = null
  get date(): Date | null {
    return this._date;
  }

  set date(value: Date | null) {
    this._date = value;
  }

  protected override initvar() {
    super.initvar();
    this.field?.classList.add('dropdown')
    this.dropdown!!.textContent = 'today'
    this.feature = this.querySelector<HTMLDivElement>('.mb-date-picker-feature')
    this.calendar = this.feature!!.querySelector<MBCalendar>('mb-calendar')
    this.calendar!!.iMBCalendar = this
  }

  protected override render(): string {
    return (super.render() + '<div class="mb-date-picker-feature"><mb-calendar class="popup-common-effect" /></div>');
  }

  protected override oninputclick(e: Event) {
    super.oninputclick(e);
    if (this.classList.contains('feature')) this.classList.remove('feature')
    else this.classList.add('feature')
  }

  protected override oninputblur(e: Event) {
    super.oninputblur(e);
    if (this.isempty != null) {
      const regex = new RegExp("[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}")
      if (regex.test(this.input!!.value)) {
        const part = this.input!!.value.split('/')
        const day = Number.parseInt(part[0]), month = Number.parseInt(part[1]), year = Number.parseInt(part[2])
        this.calendar?.load(new Date(year, month-1, day))
      } else {
        this.input!!.value = ''
        this.calendar?.load(new Date())
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

  ondateselected(date:Date) : void {
    this.date = date
    this.classList.remove('feature')
    this.input!!.value = this.calendar!!.tostring()
  }

}

customElements.define('mb-date-picker', MBDatePicker)
