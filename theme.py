import os

file_path = "pabbly.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace logistics dark blue box (#3b6694) with green (#6cff6c)
content = content.replace("background-color: #3b6694;", "background-color: #6cff6c;")

# Replace pricing hero light blue banner (#9eeaf9) with green or green gradient
# index.html hero uses linear-gradient(180deg, #6cff6c 2%, #6cff6c 68%, #6cff6c00 100%)
# Or we can just use #6cff6c for solid green. The prompt says "change color blue color into index.html page green color"
content = content.replace("background: #9eeaf9;", "background: #6cff6c;")

# Replace small checkmark blue (#2563eb) with green (#6cff6c)
content = content.replace("stroke: #2563eb;", "stroke: #6cff6c;")
content = content.replace("color: #2563eb;", "color: #6cff6c;")

# Replace blue buttons with green buttons
content = content.replace("background: #2563eb;", "background: #6cff6c;")
content = content.replace("background: #1d4ed8;", "background: #4dcc4d;")

# The "btn-buy-now" has #006aff. Let's replace that too just in case it's blue.
content = content.replace("#006aff", "#6cff6c")
content = content.replace("#005ce6", "#4dcc4d")

# The view details link has color: #006aff; -> already covered by #006aff above
# hover is #004ecc
content = content.replace("#004ecc", "#4dcc4d")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Color replacement complete.")
