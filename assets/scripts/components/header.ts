/**
 * @author Tailor Mavoungou
 * @copyright 2024
 */

import "../../styles/components/header.sass"

const menuButton = document.querySelector<HTMLButtonElement>("header .header-wrapper .header-menu-btn");
const nav = document.querySelector<HTMLElement>("header .header-wrapper nav")
menuButton.addEventListener('click', ev => {
    ev.stopPropagation()
    showOrHideMenu(!nav.classList.contains('open'))
})

window.addEventListener('click', ev => {
    const element = ev.target as HTMLElement
    if (element === nav && nav.classList.contains('open')) showOrHideMenu(false)
})




function showOrHideMenu(show : boolean = true) {
    const span = menuButton.querySelector<HTMLSpanElement>("span")
    const ul = nav.querySelector<HTMLUListElement>("ul")
    if (show) {
        span.textContent = "close"
        ul.classList.add("animate__fadeInLeft")
        nav.classList.add('open')
    }else  {
        span.textContent = 'menu'
        nav.classList.remove('open')
        ul.classList.remove("animate__fadeInLeft")
    }
}