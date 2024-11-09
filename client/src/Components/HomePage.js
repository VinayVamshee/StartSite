import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function HomePage() {

    const [Site, setSite] = useState({
        Name: ' ',
        Url: ' ',
        Logo: ' ',
        Category: ' '
    });

    const [Category, setCategory] = useState({
        Category: ' '
    })

    const AddNewSite = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://all-in-one-station-server.vercel.app/AddNewSite", { ...Site })
                .then(result => {
                    console.log(result);
                    alert("Added");
                    window.location.reload();
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error + 'not added');
        }
    }

    const DeleteSite = async (id) => {
        axios.delete('https://all-in-one-station-server.vercel.app/DeleteSite/' + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => console.log(error))
    }

    const AddNewCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://all-in-one-station-server.vercel.app/AddNewCategory", { ...Category })
                .then(result => {
                    console.log(result);
                    alert("Added");
                    window.location.reload();
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error + 'not added');
        }
    }

    const [AllSite, setAllSite] = useState([]);

    const [backgroundImage, setBackgroundImage] = useState('');
    const defaultBackgroundColor = 'linear-gradient(to right, #93e4ff, #209deb)';
    
    useEffect(() => {

        if (backgroundImage) {
            document.body.style.background = `url('${backgroundImage}')`;
            document.body.style.backgroundSize = 'cover';
        } else {
            // If no background image, set the default background color
            document.body.style.background = defaultBackgroundColor;
        }

        axios.get('https://all-in-one-station-server.vercel.app/GetSite')
            .then(result => setAllSite(result.data))
            .catch(error => console.log(error))
    }, [backgroundImage]);

    useEffect(() => {
        const savedBackgroundImage = localStorage.getItem('backgroundImage');
        if (savedBackgroundImage) {
            setBackgroundImage(savedBackgroundImage);
        }
    }, []);

    const [AllCategory, setAllCategory] = useState([]);

    useEffect(() => {
        axios.get('https://all-in-one-station-server.vercel.app/GetCategory')
            .then(result => setAllCategory(result.data))
            .catch(error => console.log(error))
    }, []);

    const googleSearch = (event) => {
        event.preventDefault();
        var text = document.getElementById("search").value;
        var cleanQuery = text.replace(" ", "+", text);
        var url = "http://www.google.com/search?q=" + cleanQuery;

        window.open(url, '_blank');
    }

    const handleBackgroundImageChange = (event) => {
        const newBackgroundImage = event.target.value;
        setBackgroundImage(newBackgroundImage);
        // Save to localStorage
        localStorage.setItem('backgroundImage', newBackgroundImage);
    };


    return (
        <div className='Home' style={{ background: backgroundImage ? `url('${backgroundImage}') no-repeat ` : defaultBackgroundColor }}>

            <div className='SearchDiv'>
                <h1>All-in-One Station</h1>
                <form onSubmit={googleSearch} className='SearchDiv'>
                    <input type='text' id='search' placeholder='Search...' />
                </form>
            </div>
            <div className='SiteCategoryDiv row'>
                {
                    AllCategory.map((category, idx) => (
                        <div key={idx} className='Category col-4'>
                            {
                                AllSite.filter(site => site.Category === category.Category).map((site, index) => (
                                    <a key={index} href={site.Url} target='_blank' rel="noreferrer" className='WebSite'>
                                        <img src={site.Logo} alt='...' />
                                        <a href={site.Url} target='_blank' rel="noreferrer">{site.Name}</a>
                                    </a>
                                ))}
                        </div>
                    ))
                }
                <div className='AllSites row'>
                    {
                        AllSite.map((Element, idx) => {
                            return (
                                <>
                                    <div key={idx} className='WebSite col-1'>
                                        <img src={Element.Logo} alt='...' />
                                        <a href={Element.Url} target='_blank' rel="noreferrer">{Element.Name}</a>
                                        <button className='btn btn-outline-danger' onClick={() => DeleteSite(Element._id)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>

            </div>
            <div className='AddNew'>

                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#ChangeBackgroundModal">
                    Change Background
                </button>

                <div className="modal fade" id="ChangeBackgroundModal" tabIndex="-1" aria-labelledby="ChangeBackgroundModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="ChangeBackgroundModalLabel">Background Image link</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <input type='url' placeholder='Background image link...' value={backgroundImage} onChange={handleBackgroundImageChange} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => setBackgroundImage(backgroundImage)}>Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <button className='btn btn-outline-dark' data-bs-toggle="modal" data-bs-target="#AddNewCategoryModal">Add New Category</button>


                <div className="modal fade" id="AddNewCategoryModal" tabIndex="-1" aria-labelledby="AddNewCategoryModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={AddNewCategory}>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="AddNewCategoryModalLabel">Add New Category</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <input type='text' placeholder='Category Name' value={Category.Category} onChange={(e) => setCategory({ ...Category, Category: e.target.value })} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <button className='btn btn-outline-dark' data-bs-toggle="modal" data-bs-target="#AddNewWebSiteModal">Add New WebSite</button>


                <div className="modal fade" id="AddNewWebSiteModal" tabIndex="-1" aria-labelledby="AddNewWebSiteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={AddNewSite}>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="AddNewWebSiteModalLabel">Add New Site</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <input type='text' value={Site.Name} onChange={(e) => setSite({ ...Site, Name: e.target.value })} placeholder='Name' />
                                    <input type='url' value={Site.Url} onChange={(e) => setSite({ ...Site, Url: e.target.value })} placeholder='Site URL' />
                                    <input type='url' value={Site.Logo} onChange={(e) => setSite({ ...Site, Logo: e.target.value })} placeholder='Logo URL' />
                                    <select onChange={(event) => setSite({ ...Site, Category: event.target.value })}>
                                        <option value="null">--Select--</option>
                                        {
                                            AllCategory.map((Element, idx) => {
                                                return (
                                                    <option key={idx} value={Element.Category}>{Element.Category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type='submit' className="btn btn-primary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
