/**
 * @copyright 2024
 * @author Tailor Mavoungou
 */
import {MBElement} from "../all";

export class MBChip extends MBElement{

  private label:string = ''

  protected attr(): void {
    this.label = this.getAttribute('label') ?? ''
  }

  protected initlistener(): void {
  }

  protected initvar(): void {
  }

  protected render(): string {
    return "";
  }

}
