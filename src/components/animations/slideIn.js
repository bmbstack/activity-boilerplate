const slideIn = {
    render(h) { // eslint-disable-line no-unused-vars
        const children = this.$slots.default;
        <div transition="slide-in">
            { children }
        </div>
    }
};

export default slideIn;
