export default {
  name: 'product',
  type: 'document',
  titile: 'product',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      type: 'string',
      title: 'name',
    },
    {
      name: 'slug',
      type: 'slug',

      tiitle: 'slug',
      options: {
        source: 'name',
        maxlength: 90,
      },
    },
    {
      name: 'price',
      type: 'number',
      tiitle: 'price',
    },
    {
      name: 'description',
      title: 'description',
      type: 'string',
    },
  ],
}
