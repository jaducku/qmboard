<template>
  <v-container
    id="Search"
    fluid
    tag="section"
    >
    <v-row
      align="center"
      justify="center"
      >
      <v-col cols="12">
        <base-material-card
          color="green"
        >
          <template
            v-slot:heading
            >
            <div
              class="display-3 font-weight-light"
              >Search
            </div>
            <v-col
              cols="12"
              sm="12"
              md="12"
              >
              <v-text-field
                label="Search"
                v-on:keyup.enter="save()"
                ></v-text-field>
            </v-col>
          </template>
          <v-card-text>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  .tim-note {
    bottom: 10px;
    color: #c0c1c2;
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    left: 0;
    margin-left: 20px;
    width: 260px;
  }
</style>
