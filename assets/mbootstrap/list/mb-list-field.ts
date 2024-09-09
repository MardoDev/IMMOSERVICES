/**
 * @copyright 2024
 * @author Tailor Mavoungou
 */
import {MBElement} from "../all";
import {List} from "./list";

export class MBListField extends MBElement{

  private _onvalidate: Function|null = null
  get onvalidate(): Function | null {
    return this._onvalidate;
  }
  set onvalidate(value: Function | null) {
    this._onvalidate = value;
  }

  private _onclear: Function|null = null
  get onclear(): Function | null {
    return this._onclear;
  }
  set onclear(value: Function | null) {
    this._onclear = value;
  }

  private _onexit: Function|null = null
  get onexit(): Function | null {
    return this._onexit;
  }
  set onexit(value: Function | null) {
    this._onexit = value;
  }

  private container: HTMLDivElement|null = null
  private footer: HTMLDivElement|null = null
  private buttons : NodeListOf<HTMLButtonElement>|null = null
  private controls: NodeListOf<HTMLButtonElement>|null = null
  private inputs: NodeListOf<HTMLInputElement>|null = null

  private _selectedItems: List<number> = new List<number>()
  get selectedItems(): List<number> {
    return this._selectedItems;
  }
  set selectedItems(value: List<number>) {
    this._selectedItems = value;
  }

  private _items: string[] = []
  get items(): string[] {
    return this._items;
  }

  set items(value: string[]) {
    this._items = value;
    if (this.container != null) this.load()
  }

  private selection: string = 'single'
  private max_selection: number|null = null

  protected attr(): void {
    const _selection = this.getAttribute('selection')
    if (_selection != null && _selection.trim().toLowerCase() == 'multiple') this.selection = _selection.trim().toLowerCase()
    const max_selection = this.getAttribute('max-selection')
    if (max_selection != null){
      const limit = Number.parseInt(max_selection)
      if (!isNaN(limit)) this.max_selection = limit
    }
  }

  protected render(): string {
    return '<div class="mb-list-field-container"></div>' +
      '<div class="mb-list-field-footer">' +
      '<button>Annuler</button>'+
      '<button>Effacer</button>'+
      '<button>OK</button>'+
      '</div>';
  }

  protected initvar(): void {
    this.container = this.querySelector<HTMLDivElement>('.mb-list-field-container')
    this.footer = this.querySelector<HTMLDivElement>('.mb-list-field-footer')
    this.controls = this.footer!!.querySelectorAll<HTMLButtonElement>('button')
    if (this.selection == 'multiple') this.classList.add('multiple')
    //this.load()
  }

  protected initlistener(): void {
    this.controls!!.forEach((value, key) => { value.addEventListener('click', e => this.oncontrolclick(e, key))})
    this.addEventListener('click', e => e.stopPropagation())
  }

  private load() : void {
    let content = ''
    this.items.forEach((value, index) => {
      content += '<button class="mb-list-field-item">'
      if (this.selection == 'multiple') content += '<input type="checkbox" />'
      else content += '<span class="material-symbols-outlined">check</span>'
      content += '<span class="mb-list-field-label">'+value+'</span>'
      content += '</button>'
    })
    this.container!!.innerHTML = content
    this.buttons = this.container!!.querySelectorAll<HTMLButtonElement>('.mb-list-field-item')
    this.buttons!!.forEach(((value, key) => { value.addEventListener('click', (e) => this.onitemclick(e, key))}))
    if (this.selection == 'multiple') {
      this.inputs = this.querySelectorAll<HTMLInputElement>('input')
      this.inputs.forEach((value,key) => {
        value.addEventListener('click', e => e.stopPropagation())
        value.addEventListener('change', e => this.onitemchecked(e, key))
      })
    }
  }

  private oncontrolclick(e: Event, index: number) : void {
    e.preventDefault()
    if (index == 0) { if (this.onexit != null) this.onexit() }
    else if (index == 1) {
      if (this.inputs != null) this.inputs.forEach(value => value.checked = false)
      this.selectedItems.removeAll()
      if (this.onclear != null) this.onclear()
    }
    else { if (this.onvalidate != null) this.onvalidate() }
  }

  private onitemchecked(e : Event, key: number) : void {
    if (this.selectedItems.contains(key)) this.selectedItems.remove(key)
    else {
      if (this.max_selection == null || this.selectedItems.length() < this.max_selection)
        this.selectedItems.add(key)
      else {
        const input = e.target as HTMLInputElement
        input.checked = false
      }
    }
  }

  private onitemclick(e : Event, index: number) : void {
    e.preventDefault()
    if (this.selection == 'multiple') this.onmulticlick(e, index)
    else this.onsingleclick(e, index)
  }

  private onsingleclick(e : Event, index: number) : void {
    if (!this.selectedItems.contains(index)) {
      this.buttons!!.forEach((value, key) =>  {
        if (key == index) value.classList.add('selected')
        else value.classList.remove('selected')
      })
      this.selectedItems.removeAll()
      this._selectedItems.add(index)
      if (this.onvalidate != null) this.onvalidate()
    }
  }

  private onmulticlick(e : Event, index: number) : void {
    if (this.selectedItems.contains(index)) {
      this.selectedItems.remove(index)
      this.inputs!![index].checked = false
    } else  {
      if (this.max_selection == null || this.selectedItems.length() < this.max_selection){
        this.selectedItems.add(index)
        this.inputs!![index].checked = true
      }
    }
  }

}
customElements.define('mb-list-field', MBListField)
