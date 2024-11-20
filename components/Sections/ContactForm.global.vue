<template>
    <form
        action="https://formspree.io/f/mwpkqnzw"
        method="POST"
        class="form mr-auto flex w-full max-w-screen-md flex-col gap-8 border p-8"
    >
        <label class="">
            <span>Your name</span>
            <input required type="text" name="name" />
        </label>
        <label class="">
            <span>Your email</span>
            <input required type="email" name="email" />
        </label>
        <label class="">
            <span>Your telephone</span>
            <input required type="tel" name="telephone" />
        </label>
        <label class="">
            <span>Subject</span>
            <input required type="text" name="subject" />
        </label>
        <label class="">
            <span>Message including your location</span>
            <textarea name="message" rows="6" />
        </label>
        <!-- your other form fields go here -->
        <button
            type="submit"
            class="ml-auto border-b border-current text-blue transition-colors hover:text-green-500"
        >
            Contact Us
        </button>
    </form>
</template>
