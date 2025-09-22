import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../common/Card";
import { Button } from "../common/Button";
import { Textarea } from "../common/Textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../common/Avatar";
import { Input } from "../common/Input";
import { MessageSquare, Heart, ThumbsUp, ArrowLeft } from "lucide-react";

// --- Sample Data (replace with actual data from your API) ---

const initialPosts = [
  {
    id: 1,
    author: "Anonymous Panda",
    title: "Feeling overwhelmed with final exams",
    content:
      "Is anyone else feeling the pressure? I have three finals in two days and I can't seem to focus on studying. Any tips for managing this stress would be appreciated.",
    comments: [
      {
        id: 101,
        author: "Anonymous Koala",
        text: "I'm right there with you! What helps me is the Pomodoro Technique. 25 minutes of focused studying, then a 5-minute break. It makes it feel less daunting.",
      },
      {
        id: 102,
        author: "Anonymous Capybara",
        text: "Definitely take breaks! And make sure you're getting enough sleep. Pulling an all-nighter usually does more harm than good for me.",
      },
    ],
    likes: 12,
  },
  {
    id: 2,
    author: "Anonymous Giraffe",
    title: "Feeling lonely in a new city",
    content:
      "I moved here for university and haven't made many friends yet. It's tough seeing everyone else in groups. How did you all meet people when you first started?",
    comments: [],
    likes: 5,
  },
];

/**
 * A peer support forum where students can anonymously share and discuss their experiences.
 */
export function PeerSupport() {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostContent, setNewPostContent] = useState("");
  const [newComment, setNewComment] = useState("");

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;
    const newPost = {
      id: Date.now(),
      author: "Anonymous User", // This would come from the logged-in user
      title: newPostContent.slice(0, 30) + "...", // Auto-generate title
      content: newPostContent,
      comments: [],
      likes: 0,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleCommentSubmit = (postId) => {
    if (!newComment.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      author: "Anonymous User",
      text: newComment,
    };
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newCommentObj] };
      }
      return post;
    });
    setPosts(updatedPosts);
    // Update the selected post as well to show the new comment immediately
    setSelectedPost(updatedPosts.find(p => p.id === postId));
    setNewComment("");
  };

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => setSelectedPost(null)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{selectedPost.title}</CardTitle>
            <CardDescription>Posted by {selectedPost.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{selectedPost.content}</p>
          </CardContent>
          <CardFooter className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" /> {selectedPost.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" /> {selectedPost.comments.length}
            </div>
          </CardFooter>
        </Card>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <div className="space-y-4">
            {selectedPost.comments.map((comment) => (
              <Card key={comment.id} className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="font-semibold text-sm">{comment.author}</p>
                  <p>{comment.text}</p>
                </CardContent>
              </Card>
            ))}
            {selectedPost.comments.length === 0 && (
              <p className="text-muted-foreground">No comments yet.</p>
            )}
          </div>
        </div>

        {/* Add a comment */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Add a Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
              />
              <Button onClick={() => handleCommentSubmit(selectedPost.id)}>
                Comment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Peer Support Forum</h1>

      {/* Create New Post */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
          <CardDescription>
            Create a new anonymous post to share with the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind? You're anonymous here."
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handlePostSubmit}>Post Anonymously</Button>
        </CardFooter>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer hover:border-primary"
            onClick={() => setSelectedPost(post)}
          >
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>Posted by {post.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">{post.content}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" /> {post.likes} Likes
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" /> {post.comments.length}{" "}
                Comments
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}