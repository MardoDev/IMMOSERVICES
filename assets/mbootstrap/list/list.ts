/**
 * @copyright 2024
 * @author Tailor Mavoungou
 */
export class List<T> {

  private _items: T[] = []

  get items(): T[] {
    return this._items;
  }

  set items(value: T[]) {
    this._items = value;
  }

  add(object: T): void {
    this._items.push(object)
  }

  get(index: number): T {
    return this._items[index]
  }

  contains(object: T) : boolean {
    let contain = false
    this._items.forEach(value => { if (value === object) contain = true })
    return contain
  }

  isempty() : boolean {
    return this._items.length == 0
  }

  length(): number {
    return this._items.length
  }

  removeAll(): void {
    this._items.splice(0)
  }

  remove(object: T):void {
    const index = this._items.indexOf(object)
    if (index != -1) {
      this._items.splice(index, 1)
    }
  }
}
