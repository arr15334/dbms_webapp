const mainMenu = [
  {
    type: 'group',
    name: 'General',
    places: ['left'],
    perms: ['*'],
    children: [
      {
        type: 'item',
        icon: 'home',
        name: 'Dashboard',
        component: 'Dashboard',
        url: '',
        places: ['left'],
        perms: ['doctor']
      },
      {
        type: 'item',
        icon: 'home',
        name: 'Dashboard',
        component: 'Dashboard',
        url: '',
        places: ['left'],
        perms: ['patient']
      }
    ]
  }
]

export default mainMenu
