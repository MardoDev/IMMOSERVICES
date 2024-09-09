/**
 * @licence
 * @author Tailor Mavoungou
 * Copyright 2024
 */
import {MBInputField} from "./internal/input-field";

export class MBTextField extends MBInputField{

  private types:string[] = ['text', 'password', 'number', 'email', 'tel', 'textarea']

  protected override attr(): void {
    super.attr()
    this.type = this.getAttribute('type') ?? 'text'
    if (!this.types.includes(this.type)) this.type = 'text'
  }

}

customElements.define('mb-text-field', MBTextField)
