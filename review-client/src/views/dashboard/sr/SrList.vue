<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      link="components/simple-tables"
      />
    <base-material-card
      icon="mdi-clipboard-text"
      title="Requested Review List"
      class="px-5 py-3"
      >
    <v-data-table
      dense
      :headers="headers"
      :items="this.reviews"
      sort-by="date"
      class="elevation-1"
      >
    <template v-slot:top>
      <v-toolbar
        flat
        color="white"
        >
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="800px"
            >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              ><v-icon>mdi-pencil</v-icon></v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                    >
                    <v-text-field
                      v-model="editedItem.srno"
                      :rules="rules"
                      label="SR No"
                      ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="8"
                    md="8"
                    >
                    <v-text-field
                      v-model="editedItem.srtitle"
                      label="SR Name"
                      ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="2"
                    md="2"
                    >
                    <v-select
                      v-model="editedItem.developer"
                      :items="developer"
                      label="개발자"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="2"
                    md="2"
                    >
                    <v-select
                      v-model="editedItem.charger"
                      :items="charger"
                      label="담당자"
                      ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="2"
                    md="2"
                    >
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        >
                        <template
                            v-slot:activator="{ on, attrs }"
                            >
                            <v-text-field
                              v-model="editedItem.date"
                              label="적용일"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.date"
                          @input="menu2 = false"
                          ></v-date-picker>
                    </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      md="2"
                      >
                      <v-select
                        v-model="editedItem.site"
                        :items="sites"
                        label="Site"
                      ></v-select>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="2"
                    md="2"
                    >
                    <v-select
                        v-model="editedItem.status"
                        :items="status"
                        label="Status"
                      ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="close"
                >Cancel</v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="reviewed(item)"
        >
        mdi-comment-check
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
        >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="deleteItem(item)"
        >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
        >Reset</v-btn>
    </template>
  </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dialog: false,
      reviews: [],
      serves: ['AP', 'UI'],
      sites: ['온양', '천안', 'SESS', 'SCS'],
      developer: ['김성지', '김미영', '송인석', '김경식', '오혜지', '오용기', '서동진', '전은경'],
      charger: ['김성지', '김미영', '송인석', '김경식', '오혜지'],
      status: ['요청', '진행', '완료'],
      rules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
      ],
      headers: [
        {
          text: '적용일',
          align: 'start',
          value: 'date',
        },
        { text: 'Site', value: 'site' },
        { text: 'SR No.', value: 'srno' },
        { text: 'SR Title', value: 'srtitle' },
        { text: '개발자', value: 'developer' },
        { text: '담당자', value: 'charger' },
        { text: '상태', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        _id: '',
        srno: '',
        srtitle: '',
        developer: '',
        charger: '',
        date: new Date().toISOString().substr(0, 10),
        site: '',
        risk: '',
        status: '요청',
      },
      defaultItem: {
        _id: '',
        srno: '',
        srtitle: '',
        developer: '',
        charger: '',
        date: new Date().toISOString().substr(0, 10),
        site: '',
        risk: '',
        status: '요청',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$http.get('/api/reviews/inprocess').then((response) => {
          this.reviews = response.data
        })
      },

      editItem (item) {
        this.editedIndex = this.reviews.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.reviews.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.$http.delete(`/api/reviews/${this.reviews[index]._id}`).then(res => {
          console.log(res.data)
          this.reviews.splice(index, 1)
        })
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.reviews[this.editedIndex], this.editedItem)
          this.$http.put(`/api/reviews/${this.editedItem._id}`, this.editedItem).then(res => { console.log(res.data) })
        } else {
          this.$http.post('/api/reviews', this.editedItem).then(res => {
            console.log(res.result)
          })
          this.reviews.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
