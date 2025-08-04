import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchBlogsFromFirestore = async () => {
  const blogsRef = collection(db, "blogs");
  const snapshot = await getDocs(blogsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export async function fetchAndFilterBlogs(term) {
  const blogsRef = collection(db, "blogs");
  const snapshot = await getDocs(blogsRef);
  const allBlogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return allBlogs.filter(b => b.title?.toLowerCase().includes(term.toLowerCase()));
}

export const isEmptyOrWhitespace = (str) => {
  return !str || str.trim() === "";
};

export const isValidEmail = (email) => email.includes('@');

export const shareBlogByEmail = async (templateParams) => {
  return await emailjs.send(
    'service_gj54w1j',
    'template_as9p5aq',
    templateParams,
    '8VJdFh8AMyhlUR5Bw'
  );
};
