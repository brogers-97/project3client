export default function Post({ post, author }) {
    const border = { border: '1px solid black' }
    console.log(post)

    return (
        <div style={border}>
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div>
                    <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex justify-between items-center mb-5 text-gray-500">
                            <span class="bg-primary-100 text-primary-800 text-m font-medium inline-flex items-center px-2.5 py-0.5 dark:bg-primary-200 dark:text-primary-800">
                                Rating: {post.rating}
                            </span>
                            <span class="text-sm">{post.createdAt}</span>
                        </div>
                        <h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                            {post.postTitle}
                        </h2>
                        <img src={post.imageUrl} alt="post.img" />
                        <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                            {post.postBody}
                        </p>
                        <div class="flex justify-end items-center">
                            <div class="flex items-center space-x-4">
                                {/* below we can add profile pic once implemented */}
                                {/* <img
                                        class="w-7 h-7 rounded-full"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                        alt="{username} avatar"
                                    /> */}
                                <span class="font-medium dark:text-white">
                                    {author}
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}
