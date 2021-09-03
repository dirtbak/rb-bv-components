<template>
    <nav :class="{busy}" class="rb-pagination">
        <ul class="pagination flex justify-content-start">
            <li v-if="controlls"
                class="controll rb-visible"
                @click="pagesArray[0] !== localCurrPage && handleClick(null, -1)"
                :class="[pagesArray[0] === localCurrPage ? 'disabled' : '']">
                <a class="page-link left d-flex justify-content-center align-items-center" href="#">
                    <rb-icon icon="icon-chevron-left"></rb-icon>
                </a>
            </li>
            <li class="page-item" :class="[isMobile ? 'd-none' : 'rb-visible', pagesArray.length == 1 ? 'd-none' : '']"
                @click="handleClick(pagesArray[0])">
                <a class="page-link d-flex justify-content-center align-items-center" href="#"
                   :class="[localCurrPage === pagesArray[0] ? 'active' : '']">
                    {{ pagesArray[0] }}
                </a>
            </li>
            <li class="page-item pad" :class="[leftPad ? 'rb-visible' : 'd-none', isMobile ? 'd-none' : '']">
                <a class="page-link d-flex justify-content-center align-items-center" href="#">...</a>
            </li>
            <li class="page-item"
                v-for="el of pagesArray"
                :key="el"
                @click="handleClick(el)"
                :class="[visiblePages[el] ? '' :
                'd-none',(el == pagesArray.length || el == 1) && !isMobile ? 'd-none' : '',]">
                <a class="page-link d-flex justify-content-center align-items-center" href="#"
                   :class="[localCurrPage === el ? 'active' : '']">
                    {{ el }}
                </a>
            </li>
            <li class="page-item pad" :class="[rightPad ? 'rb-visible' : 'd-none', isMobile ? 'd-none' : '']">
                <a class="page-link d-flex justify-content-center align-items-center" href="#">...</a>
            </li>
            <li class="page-item last" :class="[isMobile ? 'd-none' : 'rb-visible']"
                @click="localCurrPage = pagesArray[pagesArray.length - 1]">
                <a class="page-link d-flex justify-content-center align-items-center"
                   href="#"
                   :class="[localCurrPage === pagesArray[pagesArray.length - 1]? 'active': '']"
                   @click="handleClick(pagesArray[pagesArray.length-1])">
                    {{ pagesArray[pagesArray.length - 1] }}
                </a>
            </li>
            <li v-if="search && pagesArray.length > 8" class="search"
                :class="[pagesArray.length == 1 ? 'd-none' : '', search ? 'rb-visible' : '']">
                <form @submit.prevent="validateSearch">
                    <div class="d-flex justify-content-end searchbox-container" :class="{ active }">
                        <div class="input-wrapper" :class="{active}">
                            <input
                                    type="number"
                                    v-model="searchInput"
                                    placeholder="Страница"
                                    min="1"/>
                            <div class="x-mark" @click="collapse"></div>
                        </div>
                        <button type="button"
                                class="btn btn-primary d-flex justify-content-center align-items-center"
                                ref="btn"
                                @click="clickSearchBox"
                                :class="{active}">
                            <rb-icon icon="icon-search" style="color: rgb(33, 150, 243);"></rb-icon>
                        </button>
                    </div>
                </form>
            </li>
            <li v-if="controlls" class="controll rb-visible"
                @click="pagesArray[pagesArray.length - 1] !== localCurrPage && handleClick(null, 1)"
                :class=" pagesArray[pagesArray.length - 1] === localCurrPage ? 'disabled' : ''">
                <a class="page-link right d-flex justify-content-center align-items-center"
                   href="#">
                    <rb-icon icon="icon-chevron-right"></rb-icon>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "RbPagination",
        props: {
            pageNum: {
                default: 0,
                type: Number,
                validate(x) {
                    return typeof x === 'number'
                }
            },
            perPage: {
                default: 0,
                type: Number,
                validate(x) {
                    return typeof x === 'number'
                }
            },
            totalRows: {
                default: 0,
                type: Number,
                validate(x) {
                    return typeof x === 'number'
                }
            },
            search: {
                default: false,
                type: Boolean,
            },
            controlls: {
                default: false,
                type: Boolean,
            },
            busy: {
                default: false,
                type: Boolean
            }
        },
        data() {
            let arrayFromDigit = Array.from(
                {length: this.totalRows / this.perPage + (this.totalRows % 10 && 1)},
                (_, i) => i + 1
            );
            return {
                pagesArray: arrayFromDigit,
                visiblePages: arrayFromDigit.reduce(
                    (acc, el) => ({...acc, [el]: true}),
                    {}
                ),
                searchInput: "",
                active: false,
                localCurrPage: 1,
                isButton: true,
                leftPad: false,
                rightPad: false,
                isMobile: window.innerWidth < 768
            };
        },
        methods: {

            validateSearch: function () {
                if (
                    new RegExp(/\D/).test(this.searchInput) ||
                    this.searchInput <= 0 ||
                    this.searchInput > this.pagesArray.length ||
                    !this.searchInput
                ) {
                    this.searchInput = "";
                } else {
                    this.handleClick(Number(this.searchInput))
                    this.collapse();
                    this.searchInput = "";
                }
            },

            collapse: function () {
                this.active = false;
                if (!this.isButton) {
                    this.$refs.btn.setAttribute("type", "button");
                    this.isButton = true;
                }
            },

            clickSearchBox: function () {
                if (this.isButton && this.active) {
                    this.$refs.btn.setAttribute("type", "submit");
                    this.isButton = false;
                } else {
                    this.$refs.btn.setAttribute("type", "button");
                    this.isButton = true;
                }
                this.active = true;
            },

            reduction: function () {
                const reRenderVisiblePages = (isVisible = false) =>
                    Object.keys(this.visiblePages).forEach(
                        (el) => (this.visiblePages[el] = isVisible)
                    );
                const step = this.isMobile ? 4 : 5;
                if (this.pagesArray.length <= 8) {
                    // if array is too short, display all pages and stop the function
                    reRenderVisiblePages(true);
                    return;
                }
                reRenderVisiblePages();
                //leftpad logic
                if (this.localCurrPage - step <= 0) {
                    this.leftPad = false;
                    this.pagesArray
                        .slice(0, step)
                        .forEach((el) => (this.visiblePages[el] = true));
                } else {
                    this.leftPad = true;
                }

                //rightpad logic
                if (this.localCurrPage + step >= this.pagesArray.length + 1) {
                    this.rightPad = false;
                    this.pagesArray
                        .slice(this.pagesArray.length - step, this.pagesArray.length)
                        .forEach((el) => (this.visiblePages[el] = true));
                } else {
                    this.rightPad = true;
                }

                if (this.leftPad && this.rightPad) {
                    this.visiblePages[this.localCurrPage - 1] = true;
                    this.visiblePages[this.localCurrPage] = true;
                    this.visiblePages[this.localCurrPage + 1] = true;
                }
                this.inputLength();
            },

            handleClick: function (page, direction) {
                if (direction) {
                    this.localCurrPage += direction
                } else {
                    this.localCurrPage = page
                }
                this.$emit('pageChange', this.localCurrPage)
            },

            inputLength: function () {
                const computedProp = (el, prop) => parseFloat(window.getComputedStyle(el)[prop])
                let elIndex = 3
                let totalLength = 0
                const visibleElements = document.querySelectorAll('.pagination>li:not(.d-none)')
                while (elIndex <= 5) {
                    totalLength += computedProp(visibleElements[visibleElements.length - elIndex], 'width')
                    elIndex++
                }
                totalLength += (computedProp(document.querySelector('.pagination'), 'gap') * 3)
                this.$el.querySelector('input').style.width = `${totalLength}px`
            }
        },


        mounted() {
            this.reduction();
            this.$nextTick(() => this.inputLength())
        },

        created() {
            this.localCurrPage = this.pageNum;
        },

        watch: {

            localCurrPage: function () {
                this.reduction()
            },

            pageNum() {
                this.localCurrPage = this.pageNum
            }

        },
    };
</script>
