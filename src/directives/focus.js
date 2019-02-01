const directive =  {
	name: 'focus',

	/// Called when element is inserted in document
	inserted(el) {

		// Focus element
		el.focus()
	}
}

export default directive