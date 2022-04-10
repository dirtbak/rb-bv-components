<template>
    <div :class="{busy}" class="d-flex rb-pagination">
        <rb-icon :class="currPage===1?'disabled':''"
                 @click="changePage(-1)"
                 icon="icon-chevron-left"/>
        <span :class="[currPage===page?'active':'', page==='...'?'dots':'', 'page d-flex align-items-center justify-content-center']"
              @click="currPage!=='...'&&selectPage(page)"
              v-for="page of pages">
            {{page}}
        </span>
        <span :class="[isSearchVisible?'active':'', lastPage<=5?'d-none':'d-flex','search position-relative']">
            <span class="position-absolute search-wrapper">
                <input :max="totalRows"
                       @keyup.enter="selectPage()"
                       min="1"
                       placeholder="Страница..."
                       type="number"
                       v-model="searchText"/>
                <rb-icon @click="isSearchVisible=false"
                         icon="icon-close"
                         title="Закрыть поиск"/>
            </span>
            <rb-icon @click="toggleSearch()"
                     icon="icon-search"/>
        </span>
        <rb-icon :class="currPage===this.lastPage?'disabled':''"
                 @click="changePage(1)"
                 icon="icon-chevron-right"/>
    </div>
</template>

<script>
    export default {
        name: "RbPagination",
        props: {
            value: {
                type: Number,
                required: true,
                default: 1,
                validate: (x) => {
                    return typeof x === "number"
                }
            },
            perPage: {
                type: Number,
                required: true,
                default: 1,
                validate: (x) => {
                    return typeof x === 'number'
                }
            },
            totalRows: {
                type: Number,
                required: true,
                default: 1,
                validate: (x) => {
                    return typeof x === "number"
                }
            },
            busy: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                currPage: null,
                pages: [],
                isSearchVisible: false,
                searchText: null
            }
        },
        created() {
            this.currPage = this.value
            this.generatePageRange(this.currPage, this.lastPage)
        },
        computed: {
            lastPage() {
                return Math.ceil(this.totalRows / this.perPage)
            }
        },
        watch: {
            lastPage: {
                handler() {
                    this.generatePageRange(this.currPage, this.lastPage)
                },
                immediate: true
            }
        },
        methods: {
            changePage(dir) {
                if (this.currPage + dir > 0 && this.currPage + dir <= this.lastPage) {
                    this.currPage += dir
                    this.$emit('input', this.currPage)
                }
                this.generatePageRange(this.currPage, this.lastPage)
            },
            selectPage(page = parseInt(this.searchText)) {
                if (this.isSearchVisible && page < 0 || page > this.lastPage) {
                    return
                }
                if (page > 0 && page !== null) {
                    this.currPage = page
                    this.$emit('input', this.currPage)
                    this.isSearchVisible = false
                    this.generatePageRange(this.currPage, this.lastPage)
                }
            },
            toggleSearch() {
                if (!this.isSearchVisible) {
                    this.isSearchVisible = true
                } else {
                    if (this.searchText) {
                        this.selectPage();
                        this.isSearchVisible = false;
                    }
                }
            },
            generatePageRange(currentPage, lastPage, delta = 1) {
                // creates array with base 1 index
                const range = Array(lastPage)
                    .fill()
                    .map((_, index) => index + 1);

                this.pages = range.reduce((pages, page) => {
                    // allow adding of first and last pages
                    if (page === 1 || page === lastPage) {
                        return [...pages, page];
                    }

                    // if within delta range add page
                    if (page - delta <= currentPage && page + delta >= currentPage) {
                        return [...pages, page];
                    }

                    // otherwise add 'gap if gap was not the last item added.
                    if (pages[pages.length - 1] !== '...') {
                        return [...pages, '...'];
                    }

                    return pages;
                }, []);
            }
        }
    }
</script>
