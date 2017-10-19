const AutoCompleteDialogStylesObject = {
  root: {
    position: 'relative',
    marginTop: '1rem',
    marginBottom: '0.35rem',
    transition: 'all 0.28s ease-in-out'
  },
  input: {
    height: '1.9rem',
    display: 'block',
    background: 'none',
    padding: '0.125rem 1.125rem 0.0625rem',
    fontSize: '1.25rem',
    borderWidth: '0',
    borderColor: ' transparent',
    lineHeight: '1.9',
    width: '100%',
    boxShadow: 'none',
    transition: 'all 0.28s ease-in-out'
  },
  autocompleteContainer: {
    position: 'relative',
    top: '200%',
    backgroundColor: 'white',
    border: '1px solid #555555',
    width: '100%',
    transition: 'all 0.28s ease-in-out'
  },
  autocompleteItem: {
    fontSize: '1rem',
    backgroundColor: '#FFFFFF',
    padding: '10px',
    color: '#161F24',
    cursor: 'pointer',
    transition: 'all 180ms ease-in-out'
  },
  autocompleteItemActive: {
    fontSize: '1rem',
    color: '#FFFFFF',
    backgroundColor: '#7DCBC4',
    transition: 'all 100ms ease-in'
  },
  googleLogoContainer: {
    display: 'none'
  },
}

export default AutoCompleteDialogStylesObject
