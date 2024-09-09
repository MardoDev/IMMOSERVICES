/**
 * @copyright 2024
 * @author Tailor Mavoungou
 */
import {MBInputField} from "../textfield/internal/input-field";
import {MBListField} from "../list/mb-list-field";
import {IMBCalendar, MBCalendar} from "../datetime/mb-calendar";
import {MBToggleButton} from "../button/toggle-button";
import {List} from "../list/list";

export class MBDodPicker extends MBInputField implements IMBCalendar{

  private togglebutton: MBToggleButton|null = null
  private listField: MBListField|null = null
  private calendar: MBCalendar|null = null

  get selectedItems(): List<number>|null {
    return this.listField != null ? this.listField.selectedItems : null;
  }
  set selectedItems(value: List<number>) {
    if (this.listField !== null) this.listField.selectedItems = value
  }

  get date(): Date | null {
    return this.calendar != null ? this.calendar.selectedDate : null;
  }

  set date(value: Date) {
    if (this.calendar != null) this.calendar.load(value!!)
  }

  get checked() : boolean {
    return this.togglebutton != null ? this.togglebutton.checked : false
  }

  set checked(value: boolean) {
    if (this.togglebutton != null) this.togglebutton.checked = value
  }

  private _items: string[] = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

  protected override render(): string {
    return (super.render() +
    '<div class="mb-dod-picker-wrapper popup-common-effect">' +
        '<div class="mb-dod-toggle"><mb-toggle-button label="sélection par date" /></div>'+
        '<div class="mb-dod-list"><mb-list-field selection="multiple" /></div>'+
        '<div class="mb-dod-calendar"><mb-calendar /></div>'+
      '</div>'
    );
  }

  protected override initvar() {
    super.initvar();
    this.togglebutton = this.querySelector<MBToggleButton>('mb-toggle-button')
    this.listField = this.querySelector<MBListField>('mb-list-field')
    this.calendar = this.querySelector<MBCalendar>('mb-calendar')
    this.field?.classList.add('dropdown')
    this.input!!.style.cursor = 'pointer'
    this.input!!.setAttribute('readonly', 'readonly')
    this.listField!!.items = this._items
    this.listField!!.onexit = this.onexit
    this.listField!!.onclear = this.onclear
    this.listField!!.onvalidate = this.onvalidate
    this.calendar!!.iMBCalendar = this
  }

  protected override initlistener() {
    super.initlistener();
    this.togglebutton!!.oncheckedchangelistener = this.ontoggleswitch
    this.querySelector<HTMLDivElement>('.mb-dod-picker-wrapper')!!.addEventListener('click', e => e.stopPropagation())
  }

  protected override oninputclick(e: Event) {
    super.oninputclick(e);
    if (this.classList.contains('feature')) this.classList.remove('feature')
    else this.classList.add('feature')
  }

  protected override onwindowclick(e: Event) {
    super.onwindowclick(e);
    const element = e.target as HTMLElement
    if (element !== this.input && element != this.dropdown) this.classList.remove('feature')
  }

  private ontoggleswitch = () : void => {
    if (this.togglebutton!!.checked) this.classList.add('checked')
    else this.classList.remove('checked')
  }

  private onexit = () : void => {
    this.classList.remove('feature')
  }

  private onclear = (): void => {
    this.input!!.value = ''
    this.calendar?.clear()
  }

  private onvalidate = () : void => {
    this.classList.remove('feature')
    if (this.selectedItems!!.length() == 0) this.input!!.value = ""
    else {
      let content = ''
      this.selectedItems?.items.forEach((value, key) => {
        content += (key == 0 ? '' : ' - ') + this._items[value];
      })
      this.input!!.value = content
    }
  }

  ondateselected(date: Date): void {
    this.input!!.value = this.calendar!!.tostring()
    this.classList.remove('feature')
  }

}
customElements.define('mb-dod-picker', MBDodPicker)
