/**
 * @copyright 2024
 * @author Tailor Mavoungou
 */
import {MBInputField} from "./internal/input-field";

export class MBSearchTextField extends MBInputField{

  private suggestion: HTMLDivElement|null = null
  private _items: string[] = [];

  get items(): string[] {
    return this._items;
  }

  set items(value: string[]) {
    this._items = value;
    this.updatesuggestion()
  }

  protected override render(): string {
    return super.render() + '<div class="mb-search-text-field-suggestion"></div>';
  }

  protected override initvar() {
    super.initvar();
    this.field?.classList.add('dropdown')
    this.suggestion = this.querySelector<HTMLDivElement>('.mb-search-text-field-suggestion')
    this.updatesuggestion()
  }

  protected override oninputclick(e: Event) {
    super.oninputclick(e);
    //e.stopPropagation()
    const element = e.target as HTMLElement
    if (element == this.dropdown) {
      if (this.classList.contains('feature')) this.classList.remove('feature')
      else this.classList.add('feature')
    }
  }

  protected override oninputfocus(e: FocusEvent) {
    super.oninputfocus(e);
    this.classList.add('feature')
    this.updatesuggestion()
  }

  protected override oninputblur(e: Event) {
    this.field?.classList.remove('focus')
  }

  protected override ontextinput(e: Event) {
    super.ontextinput(e)
    this.updatesuggestion(this.input!!.value)
  }

  protected override onwindowclick(e: Event) {
    super.onwindowclick(e)
    const element = e.target as HTMLElement
    //alert(element)
    if (element !== this.input && element != this.dropdown) {
      this.classList.remove('feature')
      if (this.isempty != null) {
        if (this.items.includes(this.input!!.value.trim())) {
          this.enabledError(false)
          //this.field?.classList.remove('error')
          this.errorWrapper?.classList.remove('error')
        }else  this.enabledError(true)
      }
    }
  }

  private updatesuggestion(sug: string|null = null) {
    const data = sug == null ? this._items : this._items.filter(it => it.toLowerCase().startsWith(sug.toLowerCase()))
    let content = ''
    data.forEach(((value, index) => {
      content += '<button>' +
        '<span>'+value+'</span>'+
        '</button>'
    }))
    this.suggestion!!.innerHTML = content
    this.suggestion!!.querySelectorAll<HTMLButtonElement>('button').forEach((value) => {
      value.addEventListener('click', (e) => this.onitemselected(e, value))
    })
  }

  private onitemselected(e: Event, element: HTMLButtonElement) {
    e.stopPropagation()
    e.preventDefault()
    this.suggestion!!.querySelectorAll<HTMLButtonElement>('button').forEach((value) => {
      if (value !== element) value.classList.remove('selected')
      else element.classList.add('selected')
    })
    this.input!!.value = element.querySelector<HTMLSpanElement>('span')!!.textContent!!
    this.isempty = false
    this.classList.remove('feature')
  }

}

customElements.define('mb-search-text-field', MBSearchTextField)
