class NeighborCarousel {
    constructor(attractions, neighbor_number) {
        this.animate_duration = 1000;
        this.attractions = attractions;
        this.neighbor_number = neighbor_number;
        
        this.animation;
        this.isHovered = false;
        this.lastTime = 0;

        this.currentIndex = 0;
        this.need_animation = attractions.length > 5;
        if(this.need_animation && attractions.length%2 === 0) {
            this.attractions.push(attractions[attractions.length/2]);
        }

        this.card_container = this.createCardContainer();
        this.card_container.addEventListener('mouseover', () => this.handleMouseEnter());
        this.card_container.addEventListener('mouseleave', () => this.handleMouseLeave());
        this.handleMouseLeave();
    }

    createCardContainer() {
        const carousel_container = document.getElementById(`neighbor-country-section-${this.neighbor_number}`)
        const card_container = document.createElement('div');
        card_container.id = `card-container-${this.neighbor_number}`;
        card_container.classList.add(`card-container-${this.neighbor_number}`)
        carousel_container.appendChild(card_container);

        return card_container;
    }
    handleMouseEnter() {
        this.isHovered = true;
        this.card_container.classList.add('paused');
        cancelAnimationFrame(this.animation);
    }
    handleMouseLeave() {
        this.isHovered = false;
        if(!this.need_animation) {
            this.displayAttractions();
            this.card_container.classList.add('paused');
        }
        else {
            this.lastTime = performance.now();
            this.card_container.classList.remove('paused');
            this.animateAttractions();
        }
    }

    displayAttractions() {
        this.card_container.innerHTML = '';
        const currentIndex = this.currentIndex;
        for(let i=currentIndex ; i<currentIndex+this.attractions.length ; i++) {
            const attraction = this.attractions[i%this.attractions.length];
            const card = document.createElement('div');
            card.classList.add(`card`);
            card.innerHTML = `
                <div class="card-image">
                    <img src="${attraction.image_url}" alt="${attraction.name}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${attraction.name}</h3>
                    <div class="card-rating">
                        <span class="rating-score">${attraction.score}</span>
                        <span class="rating-stars">
                            ${Array(Math.round(attraction.score)).fill('&#9733;').join('')}
                        </span>
                    </div>
                </div>
            `;
            this.card_container.appendChild(card);
        }
    }

    animateAttractions(currentTime) {
        if(!this.isHovered) {
            const elapsed = currentTime - this.lastTime;
            if(elapsed > this.animate_duration) {
                this.lastTime = currentTime;
                this.currentIndex = (this.currentIndex+1) % this.attractions.length;
                this.displayAttractions();
            }
            this.animation = requestAnimationFrame((currentTime) => this.animateAttractions(currentTime));
        }
    }
}