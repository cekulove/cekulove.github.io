---
layout: default
---
<!--
{% for category in site.categories %}
## {{ category | first }}
<ul class="arc-list">
    {% for post in category.last %}
        <li><a href="{{ post.url }}">{{ post.title }}</a>{{ post.date | date:"  (%Y-%m-%d)"}}</li>
    {% endfor %}
</ul>
<hr/>
{% endfor %} -->

{% assign colors = "orange button,red button,blue button,green button,magenta button,orangellow button" | split: "," %}


<div class="animationButton">
	{% for category in site.categories %}
		{% for color in colors %}
			<a href="{{ category.last.last.url }}" class="{% cycle colors[0],colors[1],colors[2],colors[3],colors[4],colors[5] %}">{{ category | first }}</a>{% break %}
		{% endfor %}
	{% endfor %}
</div>


<table>
	<tr>
		<th>title</th>
		<th>date</th>	
		<th>category</th>
	</tr>
	{% for category in site.categories %}
		{% for post in category.last %}
			<tr>
				<td><a href="{{ post.url }}">{{ post.title }}</a></td>
				<td>{{ post.date | date:"%Y-%m-%d" }}</td>
				<td>{{ category | first }}</td>
			</tr>
		{% endfor %}
	{% endfor %}
</table>
