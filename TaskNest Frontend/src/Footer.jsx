const Footer = ({ itemCount }) => {
    return (
        <footer className="footer">
            <p className="footer-text">
               {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
        </footer>
    );
};

export default Footer;