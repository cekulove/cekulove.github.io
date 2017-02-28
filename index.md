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
dddddddddddddddd


{% assign foo="ggggg" %}
  Hello {{ foo }}!
<div class="animationButton">
	{% for category in site.categories %}
		<a href="#" class="{% circle 'red button','orange button' %}">{{ category | first }}</a>
	{% endfor %}
</div>


<table>
	<tr>
		<th>title</th>
		<th>date</th>	
		<th>tag</th>
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
