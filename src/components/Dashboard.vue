<template>
  <div class="container">
    <div class="box">
      <h1 class="title"><i class="fa fa-codepen"></i> DBMS</h1>
    </div>
    <div class="columns">
      <div class="column">
        <FormInput
          v-model="sqlQuery"
          icon="terminal"
          label="QUERY"
          placeHolder="write your query here"/>

          <FormCheckbox
            v-model="verbose"
            label="verbose"/>
      </div>
      <div class="column">
        <button v-on:click="executeQuery" class="button is-dark" icon="bolt">Execute  <i class="fa fa-bolt"></i></button>
      </div>
    </div>
    <div class="box">
      <p> <strong>Result</strong> </p>
      <table class="table is-bordered" v-show="showDatabases">
        <tbody>
          <tr v-for="db in databases" icon="database">
            <i class="fa fa-database"></i> {{db}}
          </tr>
        </tbody>
      </table>
      <table class="table is-bordered" v-show="showTables">
        <tbody>
          <tr v-for="table in tables" icon="database">
            <i class="fa fa-table"></i> {{table}}
          </tr>
        </tbody>
      </table>
      <table class="table is-bordered" v-show="showColumns">
        <tbody>
          <tr v-for="column in columns" icon="database">
            <i class="fa fa-columns"></i> {{column}}
          </tr>
        </tbody>
      </table>
    </div>


    <div class="notification is-primary" v-show="showNotificationSuccess">
      <button class="delete"></button>
      {{ notificationMessage }}
    </div>
    <div class="notification is-danger" v-show="showNotificationDanger">
      <button class="delete"></button>
      {{notificationMessage}}
    </div>
  </div>
</template>

<script>
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  export default {
    name: 'dashboard',

    components: {
      FormCheckbox,
      FormInput
    },

    data () {
      return {
        sqlQuery: null,
        database: null,
        columns: [],
        databases: [],
        tables: [],
        showDatabases: false,
        showTables: false,
        showColumns: false,
        showNotificationSuccess: false,
        showNotificationDanger: false,
        notificationMessage: null,
        verbose: false
      }
    },

    methods: {
      executeQuery: function () {
        return this
          .$store.dispatch('execute_query', {
            sqlQuery: this.sqlQuery
          })
          .then((result) => {
            const res = result.data
            // console.log(res)
            if (res.success) {
              if (res.type) {
                if (res.type === 'databases') {
                  this.databases = res.message
                  this.showTables = false
                  this.showColumns = false
                  this.showDatabases = true
                } else if (res.type === 'tables') {
                  this.tables = res.message
                  this.showTables = true
                  this.showColumns = false
                  this.showDatabases = false
                } else if (res.type === 'columns') {
                  this.columns = res.message
                  this.showTables = false
                  this.showColumns = true
                  this.showDatabases = false
                }
              } else {
                this.showNotificationSuccess = true
                this.notificationMessage = res.message
                // console.log(this.notificationMessage)
                // console.log(res.message)
                this.showNotificationDanger = false
              }
            } else {
              this.showNotificationDanger = true
              this.showNotificationSuccess = false
              this.notificationMessage = res.message || 'Error servidor'
            }
          })
      }
      /*
      analyseQuery: function () {
        const query = this.sqlQuery.split(' ')
        const action = query[0]
        const obj = query[1]

        if (action === 'CREATE') {
          if (obj === 'DATABASE') {
            this.addDatabase(query[2])
          } else if (obj === 'TABLE') {
            const name = query[2]
            this.formatTable()
            this.addTable(name)
          } else {
            // error
          }
        }
        if (action === 'ALTER') {
          if (obj === 'DATABASE') {
            const actualDb = query[2]
            const newName = query[5]
            this.renameDatabase(actualDb, newName)
          } else if (obj === 'TABLE') {
            if (query[3] === 'RENAME') {
              const oldTable = query[2]
              const newTable = query[5]
              this.renameTable(oldTable, newTable)
            }
          } else {
            // error
          }
        }
        if (action === 'SHOW') {
          if (obj === 'DATABASES') {
            this.getDatabases()
          } else if (obj === 'TABLES') {
            this.getTables()
          } else if (obj === 'COLUMNS') {
            // e
          } else {
            // error
          }
        }
        if (action === 'DROP') {
          if (obj === 'DATABASE') {
            this.dropDatabase(query[2])
          } else if (obj === 'TABLE') {
            this.dropTable(query[2])
          } else {
            // error
          }
        }
        if (action === 'USE') {
          if (obj === 'DATABASE') {
            this.database = query[2]
          } else {
            // error
          }
        }
      },
      getDatabases: function () {
        return this
          .$store.dispatch('databases_get')
          .then((dbs) => {
            console.log(dbs.data.dbs)
            const dbsArr = dbs.data.dbs
            this.elems = []
            for (const db of dbsArr) {
              this.elems.push(db)
            }
          })
      },
      addDatabase: function (name) {
        return this
          .$store.dispatch('database_create', {
            dbName: name
          })
          .then((res) => {
            console.log(res)
          })
      },
      renameDatabase: function (db, newName) {
        return this
          .$store.dispatch('database_rename', {
            db: db,
            newName: newName
          })
      },
      dropDatabase: function (name) {
        return this
          .$store.dispatch('database_drop', {
            db: name
          })
          .then((res) => {
            console.log(res)
          })
      },
      getTables: function () {
        return this
          .$store.dispatch('tables_get', {
            db: this.database
          })
          .then(tables => {
            this.elems = []
            const tableArr = tables.data.tables
            for (const table of tableArr) {
              this.elems.push(table)
            }
          })
      },
      addTable: function (name) {
        const data = {
          db: this.database,
          tableName: name,
          columns: this.columns
        }
        return this
          .$store.dispatch('table_create', data)
          .then((res) => {
            console.log(this.columns)
            console.log(res)
          })
      },
      formatTable: function (query) {
        let columns = []
        let columnDecl = this.sqlQuery.split('(')[1]
        columnDecl = columnDecl.replace(')', '')
        const cols = columnDecl.split(',')
        console.log(cols)
        for (let col in cols) {
          const cType = col.split(' ')[0]
          const cName = col.split(' ')[1]
          const newColumn = {
            name: cName,
            type: cType
          }
          columns.push(newColumn)
        }
        this.columns = columns
      },
      renameTable: function (oldName, newName) {
        return this
          .$store.dispatch('table_rename', {
            db: this.database,
            oldName: oldName,
            newName: newName
          })
          .then((res) => {
            console.log(res)
          })
      },
      dropTable: function (tableName) {
        return this
          .$store.dispatch('table_drop', {
            db: this.database,
            tableName: tableName
          })
          .then((res) => {
            console.log(res)
          })
      }
      */
    }
  }
</script>

<style lang="scss" scoped>
</style>
