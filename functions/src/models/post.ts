class Post {
  id?: string;
  title?: string;
  slug?: string;
  author?: string;
  content?: string;
  excerpt?: string;
  status?: string;
  thumbnail?: string;
  categories?: any[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(document?: FirebaseFirestore.QueryDocumentSnapshot | FirebaseFirestore.DocumentSnapshot, id?: string) {
    if (typeof document !== "undefined") {
      const data = document.data() || {};

      console.log(data.createdAt);

      this.id = document.id;
      this.title = data.title;
      this.slug = data.slug;
      this.author = data.author;
      this.content = data.content;
      this.excerpt = data.excerpt;
      this.status = data.status;
      this.categories = data.categories;
      this.thumbnail = data.thumbnail;
      this.createdAt = data.createdAt.toDate();
      this.updatedAt = data.updatedAt.toDate();
    }
  }
}

export default Post;