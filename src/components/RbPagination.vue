<template>
    <nav :class="{busy}" class="rb-pagination">
        <ul class="pagination flex justify-content-start">
            <li :class="[pagesArray[0] === localCurrPage ? 'disabled' : '']"
                @click="pagesArray[0] !== localCurrPage && handleClick(null, -1)"
                class="control rb-visible"
                v-if="controls">
                <a class="page-link left d-flex justify-content-center align-items-center" href="#">
                    <rb-icon icon="icon-chevron-left"/>
                </a>
            </li>
            <li :class="[isMobile ? 'd-none' : 'rb-visible', pagesArray.length == 1 ? 'd-none' : '']"
                @click="handleClick(pagesArray[0])"
                class="page-item">
                <a :class="[localCurrPage === pagesArray[0] ? 'active' : '']"
                   class="page-link d-flex justify-content-center align-items-center"
                   href="#">
                    {{ pagesArray[0] }}
                </a>
            </li>
            <li :class="[leftPad ? 'rb-visible' : 'd-none', isMobile ? 'd-none' : '']" class="page-item pad">
                <a class="page-link d-flex justify-content-center align-items-center" href="#">...</a>
            </li>
            <li :class="[visiblePages[el] ? '' :
                'd-none',(el == pagesArray.length || el == 1) && !isMobile ? 'd-none' : '',]"
                :key="el"
                @click="handleClick(el)"
                class="page-item"
                v-for="el of pagesArray">
                <a :class="[localCurrPage === el ? 'active' : '']"
                   class="page-link d-flex justify-content-center align-items-center"
                   href="#">
                    {{ el }}
                </a>
            </li>
            <li :class="[rightPad ? 'rb-visible' : 'd-none', isMobile ? 'd-none' : '']" class="page-item pad">
                <a class="page-link d-flex justify-content-center align-items-center" href="#">...</a>
            </li>
            <li :class="[isMobile ? 'd-none' : 'rb-visible']" @click="localCurrPage = pagesArray[pagesArray.length - 1]"
                class="page-item last">
                <a :class="[localCurrPage === pagesArray[pagesArray.length - 1]? 'active': '']"
                   @click="handleClick(pagesArray[pagesArray.length-1])"
                   class="page-link d-flex justify-content-center align-items-center"
                   href="#">
                    {{ pagesArray[pagesArray.length - 1] }}
                </a>
            </li>
            <li :class="[pagesArray.length == 1 ? 'd-none' : '', search ? 'rb-visible' : '']" class="search"
                v-if="search && pagesArray.length > 8">
                <form @submit.prevent="validateSearch">
                    <div :class="{ active }" class="d-flex justify-content-end searchbox-container">
                        <div :class="{active}" class="input-wrapper">
                            <input
                                    min="1"
                                    placeholder="Страница"
                                    type="number"
                                    v-model="searchInput"/>
                            <div @click="collapse" class="x-mark"/>
                        </div>
                        <button :class="{active}"
                                @click="clickSearchBox"
                                class="btn btn-primary d-flex justify-content-center align-items-center"
                                ref="btn"
                                type="button">
                            <rb-icon icon="icon-search" style="color: rgb(33, 150, 243);"/>
                        </button>
                    </div>
                </form>
            </li>
            <li :class=" pagesArray[pagesArray.length - 1] === localCurrPage ? 'disabled' : ''"
                @click="pagesArray[pagesArray.length - 1] !== localCurrPage && handleClick(null, 1)"
                class="control rb-visible"
                v-if="controls">
                <a class="page-link right d-flex justify-content-center align-items-center"
                   href="#">
                    <rb-icon icon="icon-chevron-right"/>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "RbPagination",
        props: {
            currPage: {
                default: 1,
                type: Number,
                validate(x) {
                    return typeof x === 'number'
                }
            },
            perPage: {
                default: 1,
                type: Number,
                validate(x) {
                    return typeof x === 'number'
                }
            },
            totalRows: {
                default: 1,
                type: Number,
                validate(x) {
                    return typeof x === 'number'
                }
            },
            search: {
                default: false,
                type: Boolean,
            },
            controls: {
                default: false,
                type: Boolean,
            },
            busy: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                pagesArray: [],
                visiblePages: [],
                searchInput: "",
                active: false,
                localCurrPage: 1,
                isButton: true,
                leftPad: false,
                rightPad: false,
                isMobile: window.innerWidth < 768
            };
        },
        computed: {
            arrayFromDigit() {
                return (this.totalRows && this.currPage) ? Array.from(
                    {length: this.totalRows},
                    (_, i) => i + 1
                ) : []
            },
            arrayFromDigitForVisibility() {
                return (this.totalRows && this.currPage) ? Array.from(
                    {length: this.totalRows / this.perPage + ((this.totalRows % 10 && this.totalRows >= 10) && 1)},
                    (_, i) => i + 1
                ) : []
            }
        },
        methods: {
            validateSearch() {
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

            collapse() {
                this.active = false;
                if (!this.isButton) {
                    this.$refs.btn.setAttribute("type", "button");
                    this.isButton = true;
                }
            },

            clickSearchBox() {
                if (this.isButton && this.active) {
                    this.$refs.btn.setAttribute("type", "submit");
                    this.isButton = false;
                } else {
                    this.$refs.btn.setAttribute("type", "button");
                    this.isButton = true;
                }
                this.active = true;
            },

            reduction() {
                const reRenderVisiblePages = (isVisible = false) =>
                    Object.keys(this.visiblePages).forEach(
                        (el) => (this.visiblePages[el] = isVisible)
                    );
                const step = this.isMobile ? 4 : 5;

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

            handleClick(page, direction) {
                if (direction) {
                    this.localCurrPage += direction
                } else {
                    this.localCurrPage = page
                }
                this.$emit('pageChange', this.localCurrPage)
            },

            inputLength() {
                if (!this.$el.querySelector('.search')) return
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
            this.$nextTick(() => this.inputLength())
        },

        watch: {
            localCurrPage: {
                handler() {
                    this.reduction()
                },
                immediate: true
            },

            currPage: {
                handler() {
                    this.localCurrPage = this.currPage
                },
                immediate: true
            },

            arrayFromDigit() {
                this.$set(this, 'pagesArray', this.arrayFromDigit)
                this.visiblePages = this.arrayFromDigitForVisibility.reduce(
                    (acc, el) => ({...acc, [el]: true}),
                    {}
                )
                this.reduction();
            }
        },
    };
</script>
