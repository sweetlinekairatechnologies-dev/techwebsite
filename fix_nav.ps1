$path = 'c:\Users\Kaira Tech\Downloads\assets\assets\css\style.css'
$c = Get-Content $path -Raw

# Fix hamburger X color
$c = $c.Replace(
    '.mobile-toggle.open span:nth-child(1) { transform: translateY(10px) rotate(45deg); background: #000; }',
    '.mobile-toggle.open span:nth-child(1) { transform: translateY(10px) rotate(45deg); background: #6cff6c; }'
)
$c = $c.Replace(
    '.mobile-toggle.open span:nth-child(3) { transform: translateY(-10px) rotate(-45deg); background: #000; }',
    '.mobile-toggle.open span:nth-child(3) { transform: translateY(-10px) rotate(-45deg); background: #6cff6c; }'
)

# Replace mobile nav panel - dark theme
$old = '    .header-nav {
        position: fixed; top: 0; right: -100%; width: 70vw; max-width: 300px;
        height: 100vh; background: #fff; flex-direction: column;
        padding: 100px 40px 40px; gap: 28px;

        box-shadow: -8px 0 40px rgba(0,0,0,.1);
        transition: right .35s cubic-bezier(.77,0,.175,1);

        z-index: 999;
    }

    .header-nav.open { right: 0; }

    .header-nav .nav-link { color: #000 !important; }
    .header-nav .nav-link:hover, .header-nav .nav-link.active { color: #000 !important; }
    .header-cta { display: none; }
    

    /* Mobile dropdown styles */

    .nav-dropdown { width: 100%; }
    .dropdown-toggle { color: #000 !important; width: 100%; justify-content: space-between; }

    .dropdown-menu {


        position: static !important; opacity: 0 !important; visibility: hidden !important;


        transform: none !important; background: #000000 !important;

        border: none !important; border-radius: 8px !important;

        margin-top: 6px !important; box-shadow: none !important;
        max-height: 0; overflow: hidden; width: 100%;
        transition: max-height 0.3s ease, opacity 0.3s ease !important;

        pointer-events: none !important;

    }


    .nav-dropdown.mobile-open .dropdown-menu {


        opacity: 1 !important; visibility: visible !important;


        max-height: 500px; pointer-events: auto !important;

    }
    .nav-dropdown.mobile-open .dropdown-arrow { transform: rotate(180deg); }
    .dropdown-item {

        padding: 10px 16px !important; font-size: .85rem !important;


        color: #000 !important; border-bottom: 1px solid rgba(0,0,0,.06) !important;


    }

    .dropdown-item:last-child { border-bottom: none !important; }
    .dropdown-item:hover { background: rgba(108,255,108,.15) !important; color: #000 !important; }'

$new = '    .header-nav {
        position: fixed; top: 0; right: -100%; width: 75vw; max-width: 300px;
        height: 100vh; background: #0a0a0a; flex-direction: column;
        padding: 90px 28px 40px; gap: 4px;
        box-shadow: -4px 0 40px rgba(0,0,0,.7);
        border-left: 1px solid rgba(108,255,108,.15);
        transition: right .35s cubic-bezier(.77,0,.175,1);
        z-index: 999;
        overflow-y: auto;
    }

    .header-nav.open { right: 0; }

    .header-nav .nav-link {
        color: #ffffff !important;
        font-size: 1rem !important;
        font-weight: 600 !important;
        padding: 13px 0 !important;
        border-bottom: 1px solid rgba(255,255,255,.07) !important;
        width: 100%;
        display: block;
    }
    .header-nav .nav-link:hover, .header-nav .nav-link.active {
        color: #6cff6c !important;
        border-bottom-color: rgba(108,255,108,.2) !important;
    }
    .header-cta { display: none; }

    /* Mobile dropdown styles */
    .nav-dropdown { width: 100%; }
    .dropdown-toggle {
        color: #ffffff !important;
        width: 100%;
        justify-content: space-between;
        padding: 13px 0 !important;
        border-bottom: 1px solid rgba(255,255,255,.07) !important;
        font-size: 1rem !important;
        font-weight: 600 !important;
    }
    .dropdown-toggle:hover { color: #6cff6c !important; }

    .dropdown-menu {
        position: static !important; opacity: 0 !important; visibility: hidden !important;
        transform: none !important; background: #141414 !important;
        border: none !important;
        border-left: 2px solid rgba(108,255,108,.3) !important;
        border-radius: 0 8px 8px 0 !important;
        margin: 4px 0 8px 12px !important; box-shadow: none !important;
        max-height: 0; overflow: hidden; width: calc(100% - 12px);
        transition: max-height 0.3s ease, opacity 0.3s ease !important;
        pointer-events: none !important;
    }

    .nav-dropdown.mobile-open .dropdown-menu {
        opacity: 1 !important; visibility: visible !important;
        max-height: 500px; pointer-events: auto !important;
    }
    .nav-dropdown.mobile-open .dropdown-arrow { transform: rotate(180deg); }
    .dropdown-item {
        padding: 10px 16px !important; font-size: .85rem !important;
        color: rgba(255,255,255,.75) !important;
        border-bottom: 1px solid rgba(255,255,255,.05) !important;
    }

    .dropdown-item:last-child { border-bottom: none !important; }
    .dropdown-item:hover { background: rgba(108,255,108,.08) !important; color: #6cff6c !important; }'

$c = $c.Replace($old, $new)
Set-Content $path $c -NoNewline
Write-Host ('Done. Contains old bg #fff: ' + $c.Contains('background: #fff'))
