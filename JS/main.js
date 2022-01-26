let url = "http://localhost:8000/api/v1/titles/111161";
const movieTitle = document.getElementById('title_best_movie');
const movieImage = document.getElementById('best_movie_img')

fetch(url)
.then(response => response.json())
.then(data => console.log(data))

fetch(url)
    .then(res=> {
        res.json().then(data=>{
            let movieTitle = data.original_title;
            movieTitle.innerText = movieTitle.charAt(0).toUpperCase() + movieTitle.slice(1);
            movieImage.setAttribute('src', data.image_url);
        })
    })













class Carousel {

    /**
     * @param {HTMLElement} element 
     * @param {Object} options
     * @param {Object} options.slidesToScroll Nbre d'éléments à faire défiler
     * @param {Object} options.slidesVisible Nbre d'éléments visible dans un slide
     * @param {boolean} options.loop Doit-on boucler en fin de carousel
     */
    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallbacks = []
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(child)
            return item
        })
        this.setStyle()
        this.createNavigation()
        this.moveCallbacks.forEach(cb => cb(0))
    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */

    setStyle () {
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) +  "%")
    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        if (this.options.loop === false) {
            return
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if(this.items[this.currentItem + this.options.slidesVisible] === undefined) {
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.remove('carousel__next--hidden')
            }
        })

    }

    next () {
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }

    prev () {
        this.gotoItem(this.currentItem - this.options.slidesToScroll)
    }

    gotoItem (index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + ', 0, 0)'
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    }

    onMove (cb) {
        this.moveCallbacks.push(cb)
    }
    /**
     * @param {string} className
     * @returns {HTMLElement} 
     */

    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', 'className')
        return div
    }

}

document.addEventListener('DOMContentLoaded', function () {

    new Carousel(document.querySelector('#carousel'), {
        slidesToScroll: 3,
        slidesVisible: 4,
        loop: false
    })

})
