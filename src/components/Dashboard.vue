<template>
  <div class="container">
    <div class="box">Query</div>
    <input v-model="sqlQuery" placeholder="edit me">
    <button v-on:click="analyseQuery" class="button is-dark">Execute  <i class="fa fa-bolt"></i></button>
    <ul>
      <li v-for="elem in elems">
        {{elem}}
      </li>
    </ul>
  </div>
</template>

<script>
  // cd Usuarios/Rodrigo/UVG/4/1/"Bases de datos"
  export default {
    name: 'dashboard',

    components: {

    },

    data () {
      return {
        elems: [],
        sqlQuery: null,
        database: null,
        columns: []
      }
    },

    methods: {

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
            //
          } else if (obj === 'TABLE') {
            // d
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
    }
  }
</script>

<style lang="scss" scoped></style>
