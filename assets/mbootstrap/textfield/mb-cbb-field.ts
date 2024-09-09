/**
 * @copyright 2024
 * @author Tailor Mavoungou
 */
import {MBInputField} from "./internal/input-field";
import {MBListField} from "../list/mb-list-field";
import {List} from "../list/list";

export class MBComboboxField extends MBInputField{

  private listField : MBListField|null = null

  private selection: string = 'single'
  private max_selection: number|null = null

  get selectedItems(): List<number>|null {
    return this.listField != null ? this.listField.selectedItems : null;
  }
  set selectedItems(value: List<number>) {
    if (this.listField !== null) this.listField.selectedItems = value
  }

  private _items: string[] = []
  get items(): string[] {
    return this._items;
  }

  set items(value: string[]) {
    this._items = value;
    if (this.listField != null) this.listField.items = value
  }

  private _onitemselected : ((position: number|number[]) => void)|null = null

  get onitemselected(): ((position: number|number[]) => void) | null {
    return this._onitemselected;
  }

  set onitemselected(value: ((position: number|number[]) => void) | null) {
    this._onitemselected = value;
  }

  protected override attr(): void {
    super.attr()
    const _selection = this.getAttribute('selection')
    if (_selection != null && _selection.trim().toLowerCase() == 'multiple') this.selection = _selection.trim().toLowerCase()
    const max_selection = this.getAttribute('max-selection')
    if (max_selection != null){
      const limit = Number.parseInt(max_selection)
      if (!isNaN(limit)) this.max_selection = limit
    }
  }

  protected override initvar() {
    super.initvar();
    this.field?.classList.add('dropdown')
    this.input!!.style.cursor = 'pointer'
    this.input?.setAttribute('readonly', 'readonly')
    this.listField = this.querySelector<MBListField>('mb-list-field')
    this.listField!!.items = this._items
    this.listField!!.onvalidate = this.onvalidate
    this.listField!!.onexit = this.onexit
  }

  protected override oninputclick(e: Event) {
    super.oninputclick(e);
    if (this.classList.contains('feature')) this.classList.remove('feature')
    else this.classList.add('feature')
  }

  protected override render(): string {
    return super.render() + '<div class="mb-cbb-field-list"><mb-list-field class="popup-common-effect" selection="'+this.selection+'" max-selection="'+this.max_selection+'" /></div>';
  }

  protected override onwindowclick(e: Event) {
    super.onwindowclick(e);
    const element = e.target as HTMLElement
    if (element != this.input && element != this.dropdown) this.classList.remove('feature')
  }

  private onexit = () : void => {
    this.classList.remove('feature')
  }

  private onvalidate = () : void => {
    this.classList.remove('feature')
    if (this.selectedItems!!.length() == 0) this.input!!.value = ""
    else {
      let content = ''
      if (this.selectedItems!!.length() == 1) {
        content += this.items[this.selectedItems.get(0)]
        if (this.onitemselected != null) this.onitemselected(this.selectedItems.get(0))
      }else {
        if (!this.selectedItems.isempty()){
          this.selectedItems?.items.forEach((value, key) => { content += (key == 0 ? '' : ' - ') + this.items[value];})
          if (this.onitemselected != null) this.onitemselected(this.selectedItems!!.items)
        }
      }
      this.input!!.value = content
    }
  }

}

customElements.define('mb-cbb-field', MBComboboxField)
