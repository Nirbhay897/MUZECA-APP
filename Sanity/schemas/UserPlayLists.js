
export default {
    name: 'user',
    title: 'user',
    type: 'document',
    icon,
    fields: [
       {
            name: 'title',
            title: 'title',
            type: 'string',
          },
        {
            name: 'caption',
            title: 'caption',
            type: 'blockContent',
          },
          {
            name:'imgUrl',
            title:'ImgUrl',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
        ],
  }