/**
 * @licence
 * @author Tailor Mavoungou
 * Copyright 2024
 */

import {MBElement} from "../all";

export interface IMBCalendar{
  ondateselected(date: Date): void
}

export class MBCalendar extends MBElement {

  private daysOfWeeks: string[] = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  private months : string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  private _selectedDate: Date = new Date()
  private _currentDate: Date = new Date()
  private _iMBCalendar : IMBCalendar|null = null
  get iMBCalendar(): IMBCalendar | null {
    return this._iMBCalendar;
  }
  set iMBCalendar(value: IMBCalendar | null) {
    this._iMBCalendar = value;
  }

  private picker: HTMLDivElement|null = null
  private pItems: HTMLDivElement|null = null

  protected attr(): void {
  }

  protected render(): string {
    return "<div class=\"mb-cal-header\">" +
      "<span class='mb-cal-month-pick'></span>"+
      "<div class='mb-cal-year-picker'>" +
      "<span class='mb-cal-year-prev mb-cal-year-control'><</span>"+
      "<span class='mb-cal-year'></span>"+
      "<span class='mb-cal-year-next mb-cal-year-control'>></span>"+
      "</div>"+
      "</div>"+"<div class='mb-cal-body'>" +
      "<div class='mb-cal-week'>"+this.builddayofweek()+"</div>"+
      "<div class='mb-cal-days'></div>"+
      "</div>"+
      "<div class='mb-cal-month-picker'><span class='mb-cal-month-picker-cancel'><</span><div class='mb-cal-month-picker-items'></div></div>";
  }

  protected initvar(): void {
    this.picker = this.querySelector('.mb-cal-month-picker')
    this.pItems = this.picker!!.querySelector('.mb-cal-month-picker-items')
    this.init()
  }

  protected initlistener(): void {
  }


  private init() {
    this.buildmonthpicker()
    this.generatecalendar()
    this.querySelectorAll('.mb-cal-year-control').forEach((control, key) => { control.addEventListener('click', (e) => this.onchangeyear(e, key))})
    this.querySelector('.mb-cal-month-pick')?.addEventListener('click', (e) => { e.stopPropagation(); this.picker?.classList?.add('show')})
    this.addEventListener('click', (e) => { e.stopPropagation() })
  }

  private buildmonthpicker() : void {
    this.months.forEach((value => { this.pItems!!.innerHTML += '<div class="item">'+value+'</div>'}))
    this.picker!!.querySelector('.mb-cal-month-picker-cancel')?.addEventListener('click', (e) => { e.stopPropagation(); this.picker?.classList.remove('show')})
    this.pItems!!.querySelectorAll('.item').forEach((it, key) => {
      it.addEventListener('click', evt => {
        evt.stopPropagation()
        this.picker?.classList.remove('show')
        this.onmonthchange(evt, key)
      })
    })
  }

  private onmonthchange(e: Event, index: number) {
    e.stopPropagation()
    this._currentDate.setMonth(index)
    this.generatecalendar()
  }

  private onchangeyear(e: Event, index: number) {
    e.stopPropagation()
    this._currentDate.setFullYear(this._currentDate.getFullYear() + (index == 0 ? -1 : 1))
    this.generatecalendar()
  }

  private builddayofweek() : string {
    let days = ''
    this.daysOfWeeks.forEach((value => days += '<span class="mb-cal-day-of-week">'+value+'</span>'))
    return days
  }

  private generatecalendar() : void {
    const daysbody = this.querySelector('.mb-cal-days');
    let dayscontent = '';
    const currYear = this._currentDate.getFullYear(), currMonth = this._currentDate.getMonth();
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    for (let i = firstDayofMonth; i > 0; i--) dayscontent += '<div class=\"mb-cal-day inactive\">'+(lastDateofLastMonth - i + 1)+'<span></span><span></span><span></span><span></span></div>'
    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday = (i === this.selectedDate.getDate() && this.selectedDate.getMonth() === currMonth && this.selectedDate.getFullYear() === currYear) ? "selected" : "";
      dayscontent += '<div class="mb-cal-day '+isToday+'">'+(i)+'<span></span><span></span><span></span><span></span></div>'
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      dayscontent += '<div class="mb-cal-day inactive">'+(i - lastDayofMonth + 1)+'<span></span><span></span><span></span><span></span></div>'
    }
    this.querySelector('.mb-cal-month-pick')!!.textContent = this.months[currMonth]
    this.querySelector('.mb-cal-year')!!.textContent = ''+currYear
    daysbody!!.innerHTML = dayscontent
    daysbody!!.querySelectorAll('.mb-cal-day').forEach((item, key) => {
      item.addEventListener('click', (e) => this.ondayitemclick(e, Number.parseInt(item.textContent!!), key))
    })
  }

  private ondayitemclick(e: Event, date : number, index : number) : void {
    e.stopPropagation()
    const days = this.querySelectorAll('.mb-cal-day')
    const selectedDay = days[index]
    if (selectedDay.classList.contains('inactive')) this.changemonthondayclick(date)
    else {
      this.selectedDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), date)
      days.forEach((it, key) => {
        if (key === index) {
          it.classList.add('selected')
        }
        else if (it.classList.contains('selected')) it.classList.remove('selected')})
      this.iMBCalendar?.ondateselected(this.selectedDate)
      //if (this.selectedItemCallback != null) this.selectedItemCallback()
    }
  }

  private changemonthondayclick(date: number) {
    const selectedMonth = date > 15 ? (this._currentDate.getMonth() -1) : (this._currentDate.getMonth() +1)
    if (selectedMonth < 0) this._currentDate = new Date(this._currentDate.getFullYear()-1, 11)
    else if (selectedMonth > 11) this._currentDate = new Date(this._currentDate.getFullYear()+1, 0)
    else this._currentDate = new Date(this._currentDate.getFullYear(), selectedMonth)
    this.selectedDate = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), date)
    this.generatecalendar()
  }

  public clear() : void {
    this.selectedDate = new Date()
    this.currentDate = new Date()
    this.generatecalendar()
  }

  public load(date : Date) : void {
    this.selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    this.currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    this.generatecalendar()
  }

  get selectedDate(): Date {
    return this._selectedDate;
  }

  set selectedDate(value: Date) {
    this._selectedDate = value;
  }

  get currentDate(): Date {
    return this._currentDate;
  }

  set currentDate(value: Date) {
    this._currentDate = value;
  }

  public tostring() : string {
    const date = (this.selectedDate.getDate() < 10 ? "0" : "") + this.selectedDate.getDate()
    const month = (this.selectedDate.getMonth() < 9 ? "0" : "") + (this.selectedDate.getMonth() + 1)
    const year = this.selectedDate.getFullYear()
    return date + "/" + month + "/" + year
  }
}

customElements.define('mb-calendar', MBCalendar)
