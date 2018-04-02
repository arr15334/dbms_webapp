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
          <p class="control has-icons-left">
            <textarea rows="2"
                      cols="80"
                      v-model="sqlQuery"
                      class="textarea"
                      placeholder="enter your query"
                      >
            </textarea>
            <span class="icon is-small is-left">
              <i class="fa fa-terminal"></i>
            </span>
          </p>

          <FormCheckbox
            v-model="verbose"
            label="verbose"/>
      </div>
      <div class="column">
        <button v-on:click="checkIfDrop" class="button is-dark" icon="bolt">Execute  <i class="fa fa-bolt"></i></button>
      </div>
    </div>
    <div class="notification is-primary" v-show="showNotificationSuccess && verbose">
      <button class="delete" v-on:click="showNotificationSuccess = false"></button>
      {{ notificationMessage }}
    </div>
    <div class="notification is-danger" v-show="showNotificationDanger">
      <button class="delete"  v-on:click="showNotificationDanger = false"></button>
      {{notificationMessage}}
    </div>
    <div v-show="!isLoading">
      <article class="message">
        <div class="message-header">
          <p>Result</p>
        </div>
        <div class="message-body">
          <table class="table is-bordered" v-show="showSelected">
            <tbody>
              <tr>
                <th v-for="column in columns">
                  <strong>{{column.name}}</strong> - {{column.type}}
                </th>
              </tr>
              <tr v-for="register in registers">
                <td v-for="elem in Object.keys(register)"> {{ register[elem] }} </td>
              </tr>
            </tbody>
          </table>
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
          <div v-show="showColumns">
            <table class="table is-bordered">
              <tbody>
                <tr>
                  <th>Column</th>
                  <th>Type</th>
                </tr>
                <tr v-for="column in columns" icon="database">
                  <td> {{column.name}}</td>
                  <td>{{column.type}}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <p v-show="pk"> <i class="fa fa-key"></i> <strong>Primary Key: </strong>name: {{pk.name}},  columns: {{pk.elements}}</p>
              <p v-show="fk"> <i class="fa fa-lock" aria-hidden="true"></i> <strong>Foreign Key: </strong>name: {{fk.name}}, elements: {{fk.elements}}, table: {{fk.referenceTable}} --> {{fk.referenceColumns}}</p>
              <p v-show="ch"> <i class="fa fa-check-square-o"></i> <strong>Check: </strong> name: {{ch.name}}</p>
            </div>
          </div>
        </div>
      </article>
      <loader :is-loading="isLoading"/>
    </div>

    <div v-show="multipleQueries && verbose">
      <textarea class="textarea is-info" rows="8" cols="80" v-model="responses" readonly>
      </textarea>
    </div>

    <confirm-modal :show-confirm="showConfirm"
                       confirm-msg="¿Realmente desea remover esta base de datos?"
                       @accept="executeQuery"
                       @cancel="cancelConfirm"/>
  </div>
</template>

<script>
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'
  export default {
    name: 'dashboard',

    components: {
      FormCheckbox,
      FormInput,
      ConfirmModal,
      Loader
    },

    data () {
      return {
        sqlQuery: null,
        database: null,
        columns: [],
        registers: [],
        constraints: [],
        responses: null,
        pk: '',
        fk: '',
        ch: '',
        databases: [],
        tables: [],
        showDatabases: false,
        showTables: false,
        showColumns: false,
        showNotificationSuccess: false,
        showNotificationDanger: false,
        showSelected: false,
        multipleQueries: false,
        notificationMessage: null,
        isLoading: false,
        showConfirm: false,
        confirmMsg: null,
        verbose: false
      }
    },

    methods: {
      checkIfDrop: function () {
        if (!this.sqlQuery) {
          this.showNotificationDanger = true
          this.verbose = true
          this.notificationMessage = 'Query vacio'
          return
        }
        let queryParts = this.sqlQuery.split(' ')
        if (this.sqlQuery.includes('DROP') && queryParts[1] === 'DATABASE') {
          this.confirmMsg = '¿Realmente desea remover base de datos' + queryParts[2] + '?'
          this.showConfirm = true
          return
        } else {
          this.executeQuery()
        }
      },
      executeQuery: function () {
        if (!this.sqlQuery) {
          this.showNotificationDanger = true
          this.verbose = true
          this.notificationMessage = 'Query vacio'
          return
        }
        // show loader
        this.isLoading = true
        // reset show values
        this.showSelected = false
        this.showTables = false
        this.showColumns = false
        this.showDatabases = false
        this.showNotificationDanger = false
        this.showNotificationSuccess = false
        this.multipleQueries = false
        this.responses = []
        this.columns = []
        this.registers = []

        return this
          .$store.dispatch('execute_query', {
            sqlQuery: this.sqlQuery
          })
          .then((result) => {
            let res = result.data.results
            if (res.length > 1) {
              this.multipleQueries = true
              for (const resp of res) {
                this.responses += resp.message + '\n'
              }
              this.notificationMessage = 'Se han realizado (' + res.length + ') operaciones'
              this.showNotificationSuccess = true
              return
            }
            res = res[0]
            if (res.success) {
              if (res.columns) {
                this.formatSelectResult(res)
                this.registers = res.registers
                console.log(this.columns)
                console.log(this.registers)
                this.showSelected = true
                return
              }
              if (res.type) {
                if (res.type === 'databases') {
                  this.databases = res.message
                  this.showDatabases = true
                  this.showNotificationSuccess = true
                  this.notificationMessage = 'Showing existing databases'
                  return
                } else if (res.type === 'tables') {
                  this.tables = res.message
                  this.showTables = true
                  this.showNotificationSuccess = true
                  this.notificationMessage = 'Showing tables for current database'
                  return
                } else if (res.type === 'columns') {
                  this.showColumns = true
                  this.showNotificationSuccess = true
                  this.notificationMessage = 'Showing columns for the selected table'
                  return this.formatColumns(res.message)
                }
              } else {
                this.showNotificationSuccess = true
                this.notificationMessage = res.message
                return
              }
            } else {
              this.showNotificationDanger = true

              if (res.message) {
                if (res.message.token) {
                  this.notificationMessage = 'Bad query: unexpected token: ' + res.message.token.value
                  return
                }
              }
              this.notificationMessage = res.message || 'Error servidor'
            }
          })
          .then(() => {
            this.showConfirm = false
          })
          .then(() => {
            this.isLoading = false
          })
      },
      formatColumns: function (m) {
        this.columns = []
        this.constraints = []
        this.pk = ''
        this.fk = ''
        this.ch = ''
        let columnKeys = Object.keys(m.columns)
        let constraintKeys = Object.keys(m.constraints) || []
        for (const key of columnKeys) {
          this.columns.push({
            'name': key,
            'type': m.columns[key].type
          })
        }
        for (const constraint of constraintKeys) {
          if (constraint === 'primaryKey') {
            this.pk = m.constraints[constraint]
            console.log(this.pk)
          } else if (constraint === 'foreignKey') {
            this.fk = m.constraints[constraint]
          } else if (constraint === 'check') {
            this.ch = m.constraints[constraint]
          }
        }
      },
      formatSelectResult: function (m) {
        const table = Object.keys(m.columns)[0]
        const columnKeys = Object.keys(m.columns[table])
        for (const cKey of columnKeys) {
          this.columns.push({
            'type': m.columns[table][cKey].type,
            'name': cKey
          })
        }
        console.log(this.columns)
      },
      cancelConfirm: function () {
        this.sqlQuery = null
        this.showConfirm = false
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
