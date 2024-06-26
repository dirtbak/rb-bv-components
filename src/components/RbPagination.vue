<template>
    <div :class="{busy}" class="d-flex rb-pagination" v-click-outside="onClickOutside">
        <rb-icon :class="{disabled: currPage === 1}"
                 @click="changePage(-1)"
                 icon="icon-chevron-left"/>
        <span :class="[{active: currPage === page}, {dots: page === '...'}, 'page d-flex align-items-center justify-content-center']"
              @click="currPage!=='...'&&selectPage(page)"
              v-for="page of pages">
            {{page}}
        </span>
      <div class="search">
        <b-input-group class="input-group flex-nowrap">
          <template #prepend>
            <rb-icon @click="selectPage()" color="#AAABAD" icon="icon-search"/>
          </template>
          <b-input
              :max="totalRows"
              ref="input"
              @keyup.enter="selectPage()"
              min="1"
              :placeholder="$tbv('goPage')"
              type="number"
              v-model="searchText"
              class="search-input">
          </b-input>
        </b-input-group>
      </div>
        <rb-icon :class="{disabled: currPage === this.lastPage}"
                 @click="changePage(1)"
                 icon="icon-chevron-right"/>
    </div>
</template>

<script>
    import RbIcon from "@/components/RbIcon.vue";

    export default {
        name: "RbPagination",
      components: {RbIcon},
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
            },
            value(){
                this.currPage = this.value;
                this.generatePageRange(this.currPage, this.lastPage)
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
                    this.isSearchVisible = true;
                    this.$refs.input.focus();
                } else {
                    if (this.searchText) {
                        this.selectPage();
                    }
                    this.searchText = null;
                }
            },
            generatePageRange(currentPage, lastPage, delta = 5) {
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
            },
            onClickOutside() {
                this.isSearchVisible = false
            }
        }
    }
</script>
