export default {
  name: 'message',
  title: 'Message',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'aprooved',
      title: 'Aprooved',
      type: 'boolean',
      description: 'Aprooved comments are visible to all users',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'message',
      type: 'text',
    },
    {
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }],
    },
  ],
}
