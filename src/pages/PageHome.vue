<template>
	<q-page class="q-pa-lg relative-position">
		<q-scroll-area class="absolute full-width full-height">
			<!-- Post Feature -->
			<div class="q-py-lg row items-end q-col-gutter-md">
				<div class="col">
					<!-- Text Input -->
					<q-input
						class="new-post"
						bottom-slots
						autogrow
						v-model="newPostContent"
						label="What's the Bird doing?"
						counter
						maxlength="200"
					>
						<template v-slot:before>
							<!-- profile Picture -->
							<q-avatar size="xl" class="q-ml-sm">
								<img src="https://cdn.quasar.dev/img/avatar5.jpg" />
							</q-avatar>
						</template>
					</q-input>
				</div>
				<div class="col col-shrink q-pr-lg q-mr-lg">
					<!-- Post Button -->
					<!-- :disable makes it where you cannot post on an empty post -->
					<q-btn
						@click="addNewPost"
						class="q-mb-lg"
						unelevated
						no-caps
						:disable="!newPostContent"
						rounded
						color="primary"
						label="Post"
					/>
				</div>
			</div>
			<!-- Horizontal Line -->
			<q-separator size="10px" color="grey-2" class="divider" />
			<!-- recent posts -->
			<!-- Post Start -->
			<q-list separator>
				<transition-group
					appear
					enter-active-class="animated fadeIn slow"
					leave-active-class="animated fadeOut slow"
				>
					<q-item-label header>Recent Posts</q-item-label>
					<!-- loop through our posts -->
					<q-item v-for="post in posts" :key="post.id" class="q-py-md">
						<q-item-section avatar top>
							<q-avatar>
								<img src="https://cdn.quasar.dev/img/avatar2.jpg"/>
							</q-avatar>
						</q-item-section>

						<q-item-section>
							<q-item-label class="text-subtitle1">
								<!-- user -->
								<strong> Andrew Harper </strong>
								<span class="text-grey-7">
									GrassFinn <br class="lt-md" />
									<!-- Show Date -->
									&bull; {{ getRelativeDate(post.date) }}
								</span>
							</q-item-label>
							<!-- post content -->
							<q-item-label class="post-content text-body1">
								{{ post.content }}
							</q-item-label>
							<!-- reaction Buttons -->
							<!-- comment BUtton -->
							<div class="post-icons row justify-between q-mt-sm">
								<q-btn
									flat
									round
									size="sm"
									color="grey"
									icon="fas fa-solid fa-comment-dots"
								/>
								<!-- retweet button -->
								<q-btn
									flat
									round
									size="sm"
									color="grey"
									icon="fas fa-retweet"
								/>
								<!-- like Button -->
								<!-- can use logic if binded through : -->
								<q-btn
									flat
									round
									size="sm"
									:color="post.liked ? 'red' : 'grey'"
									:icon="post.liked ? 'fas fa-heart' : 'far fa-heart'"
									@click="toggleLiked(post)"
								/>
								<!-- Delete Button -->
								<q-btn
									flat
									round
									size="sm"
									color="grey"
									icon="fas fa-trash"
									class="q-pr-lg q-mr-lg"
									@click="deletePost(post)"
								/>
							</div>
						</q-item-section>
						<!-- Date of post -->
					</q-item>
					<!-- Post End -->
				</transition-group>
			</q-list>
		</q-scroll-area>
	</q-page>
</template>

<script>
// imports
import { formatDistance } from 'date-fns';

import { defineComponent } from 'vue';

import db from 'src/boot/firebase.js';

import {
	collection,
	query,
	where,
	onSnapshot,
	orderBy,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';

export default defineComponent({
	name: 'PageHome',
	data() {
		return {
			newPostContent: '',
			posts: [
				// {
				// 	id: 'ID1',
				// 	content:
				// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui. Morbi tristique senectus et netus et malesuada fames. Curabitur gravida arcu ac tortor. Quam vulputate dignissim suspendisse in. ',
				// 	date: 1644536051026,
				// 	liked: false,
				// },
				// {
				// 	id: 'ID2',
				// 	content:
				// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui. Morbi tristique senectus et netus et malesuada fames. Curabitur gravida arcu ac tortor. Quam vulputate dignissim suspendisse in. ',
				// 	date: 1644536116569,
				// 	liked: true,
				// },
			],
		};
	},
	methods: {
		// Function for getting time
		getRelativeDate(value) {
			return formatDistance(value, new Date());
		},
		// Functions for adding posts
		addNewPost() {
			// objects for our posts
			let newPost = {
				content: this.newPostContent,
				date: Date.now(),
				liked: false,
			};
			// adds posts to the database
			const docRef = addDoc(collection(db, 'posts'), newPost);
			// console.log('Document written with ID: ', docRef.id);
			this.newPostContent = '';
		},
		deletePost(post) {
			deleteDoc(doc(db, 'posts', post.id));
		},
		toggleLiked(post) {
			const likedPost = doc(db, 'posts', post.id);

			// Set the "capital" field of the city 'DC'
			updateDoc(likedPost, {
				// sets to the opposite of what the value of liked is
				liked: !post.liked,
			});
		},
		// End of Methods
	},
	mounted() {
		const q = query(collection(db, 'posts'), orderBy('date'));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				let postChange = change.doc.data();
				postChange.id = change.doc.id;
				if (change.type === 'added') {
					// console.log('New post: ', postChange);
					// adds post to beginning of the array
					this.posts.unshift(postChange);
				}
				if (change.type === 'modified') {
					// console.log('Modified post: ', postChange);
					let index = this.posts.findIndex((post) => post.id === postChange.id);
					Object.assign(this.posts[index], postChange);
				}
				if (change.type === 'removed') {
					// console.log('Removed post: ', postChange);
					//look through index
					let index = this.posts.findIndex((post) => post.id === postChange.id);
					//if index matches splice it
					this.posts.splice(index, 1);
				}
			});
		});
	},
});
</script>
<style lang="sass">
.new-post
	textarea
		font-size: 19px
		line-height: 1.5 !important
.divider
	border-top: 1px solid
	border-bottom: 1px solid
	border-color: $grey-4
.post-content
	white-space: pre-line
	line-height: 1.5 !important
.post-icons
	margin-left: -5px
</style>
