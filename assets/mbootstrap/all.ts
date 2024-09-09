/**
 * @licence
 * @author Tailor Mavoungou
 * Copyright 2024
 */

export abstract class MBElement extends HTMLElement{
  private _isEnabled: boolean = true

  public get isEnabled(): boolean {
    return this._isEnabled;
  }

  public set isEnabled(value: boolean) {
    this._isEnabled = value;
  }

  connectedCallback(){
    this.attr()
    this.innerHTML = this.render()
    this.initvar()
    this.initlistener()
  }

  protected abstract attr(): void
  protected abstract render(): string
  protected abstract initvar() : void
  protected abstract initlistener(): void
}
