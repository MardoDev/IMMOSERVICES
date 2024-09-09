import {MBElement} from "../all";
import {MBInputField} from "../textfield/internal/input-field";

/**
 * @copyright 2024
 * @author Tailor Mavoungou
 */

export class FormValidator <T extends MBInputField>{
  private form: HTMLFormElement|null = null

  constructor(selector:string|HTMLFormElement) {
    this.form = typeof selector == "string" ? document.querySelector<HTMLFormElement>(selector) : selector
  }

  public validate() : boolean {
    //if (!isvalid) this.disabledfield(false)
    return this.isvalid()
  }

  private isvalid(): boolean {
    let response = true
    const fields = this.form!!.querySelectorAll<T>('mb-text-field')
    fields.forEach((value, key) =>  {
      //const input_field = value
      if (value.text == null || value.text == '') {
        value.enabledError(true)
        response = false
      }else value.enabledError(false)
    })
    return response
  }

  get<T extends MBElement>(selector: string) : T|null {
    return this.form!!.querySelector<T>(selector)
  }

  reset() : void {
    const fields = this.form!!.querySelectorAll<T>('mb-text-field')
    fields.forEach((value, key) =>  {
      value.text = ""
      value.isempty = null
    })
  }

}
