class Post {
  id?: string;
  title?: string;
  slug?: string;
  author?: String;
  content?: string;
  excerpt?: string;
  status?: string;
  categories?: any[];
  createdAt?: Date | null;
  updatedAt?: Date | null;

  constructor(document?: FirebaseFirestore.QueryDocumentSnapshot | FirebaseFirestore.DocumentSnapshot, id?: string) {
    if (typeof document !== "undefined") {
      let data = document.data() || {};

      this.id = document.id;
      this.createdAt = (typeof document.createTime !== "undefined" ? document.createTime.toDate() : null);
      this.updatedAt = (typeof document.updateTime !== "undefined" ? document.updateTime.toDate() : null);

      this.title = data.title;
      this.slug = data.slug;
      this.author = data.author;
      this.content = data.content;
      this.excerpt = data.excerpt;
      this.status = data.status;
      this.categories = data.categories;
      this.status = data.status;
    }
  }
}

export default Post;